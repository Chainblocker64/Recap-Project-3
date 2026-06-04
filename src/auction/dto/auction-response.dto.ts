import { Expose } from 'class-transformer';

export class AuctionResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  currentPrice!: number;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  seller!: string;

  @Expose()
  createdAt!: Date;
}
