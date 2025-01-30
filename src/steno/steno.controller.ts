import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StenoService } from './steno.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('steno')
export class StenoController {
  constructor(private readonly stenoService: StenoService) {}

  @Post('init-codecs')
  async initCodecs(): Promise<void> {
    await this.stenoService.initCodecs();
  }

  @Get('check-codecs')
  checkCodecsReady(): boolean {
    return this.stenoService.isCodecsReady();
  }

  @Post('encode')
  async encodeMessage(
    @Body()
    {
      imageId,
      msg,
      password,
    }: {
      imageId: number;
      msg: string;
      password: string;
    },
  ): Promise<boolean> {
    return this.stenoService.writeMsgToImage(imageId, msg, password);
  }

  @Get('decode/:imageId')
  async decodeMessage(
    @Param('imageId') imageId: number,
    @Body() { password }: { password: string },
  ): Promise<string> {
    return this.stenoService.readMsgFromImage(imageId, password);
  }
}
