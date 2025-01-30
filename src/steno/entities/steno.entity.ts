import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';

@Entity('stenos')
export class Steno {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @Column({ type: 'int', default: 0 })
  verification_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_verified: Date;

  @Column('text')
  message: string;
}
