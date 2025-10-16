import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  beforeEach(async () => {
    ((fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'pass' } as User]);
      },

      // remove: (id: number) => {
      // return Promise.resolve()
      // },
      // update: (id :number , attrs: Partial<User>) => {
      // return Promise.resolve({ id, email: 'test@test.com', password: 'password'} as User)
      // }
    }),
      (fakeAuthService = {
        signin: (email: string, password: string) => {
          return Promise.resolve({ id: 1, email, password } as User);
        },
      }));
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all Users and returns a list of users with given email', async () => {
    const users = await controller.findAllUser('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('find a user with a given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('throw an error if the userId is not given or not found', async () => {
    fakeUserService.findOne = () => Promise.resolve(null) as any;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin a user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'test@test.com', password: 'password' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
