import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
