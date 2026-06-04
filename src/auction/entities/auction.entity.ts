import { Offer } from '../../offer/entities/offer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'numeric', scale: 2, nullable: true })
  startingPrice!: number;

  @Column({ type: 'numeric', scale: 2, nullable: true })
  currentPrice!: number;

  @Column({ type: 'datetime' })
  endDate!: Date;

  @Column({ type: 'varchar' })
  seller!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];
}
