import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let server: any;

  const mockUser = {
    username: 'e2etestuser',
    password: 'test1234',
    role: 'STAFF',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    server = app.getHttpServer();
  });

  it('Register a new user (POST /auth/register)', async () => {
    const res = await request(server).post('/auth/register').send(mockUser);
    console.log(res);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('access_token');
  });

  it('Login with correct credentials (POST /auth/login)', async () => {
    const res = await request(server).post('/auth/login').send(mockUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('access_token');
  });

  it('Login with wrong credentials (POST /auth/login)', async () => {
    const res = await request(server).post('/auth/login').send({
      username: 'e2etestuser',
      password: 'wrongpass',
    });
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
