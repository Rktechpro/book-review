import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  bookId: number;

  @Column('text')
  review: string;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;
}
