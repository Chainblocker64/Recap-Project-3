import { Expose, Type } from 'class-transformer';
import { OfferResponseDto } from 'src/offer/dto/offer-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

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
  @Type(() => UserResponseDto)
  seller!: UserResponseDto;

  @Expose()
  @Type(() => OfferResponseDto)
  offers!: OfferResponseDto[];

  @Expose()
  createdAt!: Date;
}
