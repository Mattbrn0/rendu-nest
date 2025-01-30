import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ImageService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async create(
    @Body() createImageDto: CreateImageDto,
    @Res() res,
  ): Promise<void> {
    await this.imageService.create(createImageDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Image importée avec succès',
    });
  }

  @Get()
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Image> {
    return this.imageService.findOne(id);
  }
}
