import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './database-service/category.entity';
import { MODULE_NAME } from './name';

@Module({
  imports: [TypeOrmModule.forFeature([Category], MODULE_NAME)],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
