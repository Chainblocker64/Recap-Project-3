import { Expose } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id!: number;

  @Expose()
  auctionId!: number;

  @Expose()
  bidPrice!: number;

  @Expose()
  buyer!: string;

  @Expose()
  createdAt!: Date;
}
