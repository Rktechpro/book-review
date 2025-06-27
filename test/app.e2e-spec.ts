import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Books', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should create a book', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: '1984', author: 'Orwell' })
      .expect(201);
  });

  it('should fetch all books', () => {
    return request(app.getHttpServer()).get('/books').expect(200);
  });
});
