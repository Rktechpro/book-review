import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('books/:bookId/reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @Get()
  find(@Param('bookId') bookId: number) {
    return this.service.findByBookId(+bookId);
  }

  @Post()
  create(@Param('bookId') bookId: number, @Body() dto: CreateReviewDto) {
    return this.service.create(+bookId, dto);
  }
}
