import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'numeric', scale: 2, nullable: true })
  bidPrice!: number;

  @Column({ type: 'numeric' })
  auctionId!: number;

  @Column({ type: 'varchar' })
  buyer!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
