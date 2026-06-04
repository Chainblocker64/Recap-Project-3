import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto) {
    const endDate = !createAuctionDto.endDate
      ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Default to 3 days from now
      : new Date(createAuctionDto.endDate);

    const auctionPayload = this.auctionRepository.create({
      ...createAuctionDto,
      endDate: endDate,
      currentPrice: createAuctionDto.startingPrice,
    });

    const auction = await this.auctionRepository.save(auctionPayload);

    return plainToInstance(AuctionResponseDto, auction, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(filter: FilterDto) {
    const { status, page, limit } = filter;

    /*
    WIP
    let whereFilters:  = {};

    switch (status) {
      case 'open':
        whereFilters.startingPrice = LessThanOrEqual(1);
        break;
      case 'closed':
        break;
    }

    console.log(status);
    */

    const [data, total] = await this.auctionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: whereFilters,
    });

    const auctionResponse = {
      data: plainToInstance(AuctionResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return auctionResponse;
  }

  async findOne(id: number): Promise<AuctionResponseDto | null> {
    const auction = await this.auctionRepository.findOneBy({ id });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return plainToInstance(AuctionResponseDto, auction, {
      excludeExtraneousValues: true,
    });
  }
}
