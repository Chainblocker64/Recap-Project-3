import {
  IsInt,
  IsOptional,
  Min,
  Max,
  IsIn,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsIn(['open', 'closed'])
  @Type(() => String)
  status!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  maxPrice?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
