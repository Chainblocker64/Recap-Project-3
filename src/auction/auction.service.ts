import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { AuctionResponseDto } from './dto/auction-response.dto';

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

    const auction = await this.auctionRepository.create({
      ...createAuctionDto,
      endDate,
    });

    return await this.auctionRepository.save(auction);
  }

  findAll() {
    return this.auctionRepository.find();
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

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
