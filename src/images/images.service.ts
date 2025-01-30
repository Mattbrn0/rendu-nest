import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(createImageDto);
    return this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  findOne(id: number): Promise<Image> {
    return this.imageRepository.findOneBy({ id });
  }
}
