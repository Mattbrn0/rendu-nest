import { Module } from '@nestjs/common';
import { StenoService } from './steno.service';
import { StenoController } from './steno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Steno } from './entities/steno.entity';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Steno, Image])],
  providers: [StenoService],
  controllers: [StenoController],
})
export class StenoModule {}
