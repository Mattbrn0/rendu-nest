import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './images.service';
import { ImageController } from './images.controller';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
