import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './genre.controller';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { MODULE_NAME } from './name';

@Module({
  imports: [TypeOrmModule.forFeature([Genre], MODULE_NAME)],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
