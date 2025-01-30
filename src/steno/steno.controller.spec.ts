import { Test, TestingModule } from '@nestjs/testing';
import { StenoController } from './steno.controller';
import { StenoService } from './steno.service';

describe('StenoController', () => {
  let controller: StenoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StenoController],
      providers: [StenoService],
    }).compile();

    controller = module.get<StenoController>(StenoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
