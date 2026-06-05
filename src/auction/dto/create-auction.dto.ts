import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@ApiSchema({
  name: 'Create auction payload',
})
export class CreateAuctionDto {
  @ApiProperty({
    name: 'Auction title',
    example: 'Apple AirPods Pro',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    name: 'Auction description',
    example: 'Apple AirPods Pro description',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    name: 'Starting price',
    example: 300,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  startingPrice!: number;

  @ApiProperty({
    name: 'Auction end date',
    example: '2026-06-04T10:04:58.000Z',
  })
  @IsOptional()
  @IsDate()
  endDate!: Date;
}
