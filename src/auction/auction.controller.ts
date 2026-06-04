import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { OfferService } from 'src/offer/offer.service';
import { CreateOfferDto } from 'src/offer/dto/create-offer.dto';
import { OfferResponseDto } from 'src/offer/dto/offer-response.dto';

@Controller('auctions')
export class AuctionController {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly offerService: OfferService,
  ) {}

  @Post()
  async create(@Body() createAuctionDto: CreateAuctionDto) {
    return await this.auctionService.create(createAuctionDto);
  }

  @Get()
  findAll() {
    return this.auctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(+id);
  }

  @Post(':id/offers')
  async addOffer(
    @Param('id') auctionId: string,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferResponseDto> {
    return await this.offerService.create(Number(auctionId), createOfferDto);
  }
}
