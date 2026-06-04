import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
    @IsNotEmpty()
    @IsNumber()
    bidPrice!: number;

    @IsNotEmpty()
    @IsString()
    buyer!: string;
}
