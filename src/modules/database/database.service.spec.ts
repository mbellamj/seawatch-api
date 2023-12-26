import { IDatabaseService } from '@core/abstracts';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DatabaseService } from './database.service';
import { Category, Genre } from './entities';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IDatabaseService,
          useFactory: (
            categoryRepository: Repository<Category>,
            genreRepository: Repository<Genre>,
          ) => new DatabaseService(categoryRepository, genreRepository),
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(IDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
