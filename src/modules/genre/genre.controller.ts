import { Controller, Get, Param, Post, Req } from '@nestjs/common';

@Controller('genres')
export class GenreController {
  @Post()
  create(@Req() request: Request): string {
    return 'This action adds a new genre';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return `This action returns all genres`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} genre`;
  }
}
