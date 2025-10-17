import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrpyt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrpyt);

@Injectable()
export class AuthService {
  constructor(private UserService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.UserService.find(email);
    if (users.length) {
      throw new BadRequestException('The email is in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    const user = await this.UserService.create(email, hashedPassword);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.UserService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [salt, StoredHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (StoredHash !== hash.toString('hex'))
      throw new BadRequestException('credentials invalid');
    return user;
  }
}
