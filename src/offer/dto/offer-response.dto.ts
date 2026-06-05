import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class OfferResponseDto {
  @Expose()
  id!: number;

  @Expose()
  auctionId!: number;

  @Expose()
  bidPrice!: number;

  @Expose()
  @Type(() => UserResponseDto)
  buyer!: UserResponseDto;

  @Expose()
  createdAt!: Date;
}
