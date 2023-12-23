import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('movies')
export class MovieController {
  @Post()
  create(@Req() request: Request): string {
    return 'This action adds a new movie';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return `This action returns all movies`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} movie`;
  }
}
