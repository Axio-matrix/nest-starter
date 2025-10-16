import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (GET)', () => {
    const testEmail = 'test2@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ id: 1, email: testEmail, password: 'pass' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });

  it('sign up a user and return current infos', async () => {
    const testEmail = 'test@test.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ id: 1, email: testEmail, password: 'pass' })
      .expect(201);
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoiam')
      .set('Cookie', cookie as string[])
      .expect(200);
    expect(body.email).toEqual(testEmail);
  });
});
