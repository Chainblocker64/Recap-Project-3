import 'reflect-metadata';
import { Auction } from './auction/entities/auction.entity';
import { Offer } from './offer/entities/offer.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './data/dark-bay.sqlite',
  entities: [Auction, Offer],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Absolutely critical to disable this here
});
