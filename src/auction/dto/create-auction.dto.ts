import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  startingPrice!: number;

  @IsDateString()
  endDate!: Date;

  @IsString()
  @IsNotEmpty()
  seller!: string;
}
