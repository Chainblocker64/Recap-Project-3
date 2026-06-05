import { IsInt, IsOptional, Min, Max, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'Optional filter parameters',
})
export class FilterDto {
  @ApiProperty({
    name: 'Page',
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    name: 'Amount of items per page',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty({
    name: 'Status of the auction',
    example: 'open',
  })
  @IsOptional()
  @IsIn(['open', 'closed'])
  @Type(() => String)
  status!: string;

  @ApiProperty({
    name: 'Minimal price of the auction',
    example: 10.99,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number = 0;

  @ApiProperty({
    name: 'Maximal price of the auction',
    example: 10.99,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  maxPrice?: number;

  @ApiProperty({
    name: 'Sorting order of the response',
    example: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
