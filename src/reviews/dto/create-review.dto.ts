import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  review: string;
}
