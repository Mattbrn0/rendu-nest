import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from '../images/entities/image.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
