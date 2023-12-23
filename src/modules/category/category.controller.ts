import { Controller, Get, Param, Post, Req } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  @Post()
  create(@Req() request: Request): string {
    return 'This action adds a new category';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return `This action returns all categories`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} category`;
  }
}
