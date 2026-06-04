import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Auction } from 'src/auction/entities/auction.entity';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { OfferResponseDto } from './dto/offer-response.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  async create(
    id: number,
    createOfferDto: CreateOfferDto,
  ): Promise<OfferResponseDto> {
    const auction = await this.auctionRepository.findOne({ where: { id } });

    if (!auction) {
      throw new NotFoundException();
    }

    if (auction.endDate < new Date()) {
      throw new ConflictException('Auction has been closed');
    }

    if (auction.currentPrice >= createOfferDto.bidPrice) {
      throw new ConflictException('Bid does not exceed current price');
    }

    const offerPayload = this.offerRepository.create(createOfferDto);
    const offer = await this.offerRepository.save(offerPayload);

    return plainToInstance(OfferResponseDto, offer, {
      excludeExtraneousValues: true,
    });
  }

  findAll() {
    return `This action returns all offer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
