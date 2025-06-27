import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private repo: Repository<Review>) {}

  findByBookId(bookId: number) {
    return this.repo.find({ where: { bookId } });
  }

  create(bookId: number, dto: CreateReviewDto) {
    const review = this.repo.create({ ...dto, bookId });
    return this.repo.save(review);
  }
}
