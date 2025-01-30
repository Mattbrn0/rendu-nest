import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Steno } from 'src/steno/entities/steno.entity';
import { User } from 'src/users/users.entity';
// import { Certificat } from './certificat.entity'; // On suppose qu'il existe une entité Certificat

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  url: string;

  @Column({ type: 'varchar', length: 200 })
  signature: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Steno, (steno) => steno.image)
  stenos: Steno[];

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' }) // Spécifie le nom de la colonne
  user: User;

  //   @ManyToOne(() => Certificat, (certificat) => certificat.images)
  //   certificat: Certificat;
}
