import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    private redisService: RedisService
  ) {}

  async findAll() {
    const cached = await this.redisService.get('books');
    if (cached) return JSON.parse(cached);

    const books = await this.bookRepo.find({ relations: ['reviews'] });
    await this.redisService.set('books', books);
    return books;
  }

  async create(dto: CreateBookDto) {
    const book = this.bookRepo.create(dto);
    await this.bookRepo.save(book);
    await this.redisService.del('books');
    return book;
  }
}
