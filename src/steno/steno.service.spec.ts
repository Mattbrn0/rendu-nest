import { Test, TestingModule } from '@nestjs/testing';
import { StenoService } from './steno.service';

describe('StenoService', () => {
  let service: StenoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StenoService],
    }).compile();

    service = module.get<StenoService>(StenoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
