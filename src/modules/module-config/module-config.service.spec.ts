import { Test, TestingModule } from '@nestjs/testing';
import { ModuleConfigService } from './module-config.service';

describe('ModuleConfigService', () => {
  let service: ModuleConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleConfigService],
    }).compile();

    service = module.get<ModuleConfigService>(ModuleConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
