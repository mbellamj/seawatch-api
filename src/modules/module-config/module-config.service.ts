import { IGenericConfig, IModuleConfigService } from '@core/abstracts';
import {
  CATEGORY_CONFIG_TOKEN,
  GENRE_CONFIG_TOKEN,
  MOVIE_CONFIG_TOKEN,
} from '@core/contants';
import { Injectable } from '@nestjs/common';
import { ModuleConfig } from './module.config';

@Injectable()
export class ModuleConfigService implements IModuleConfigService {
  category: IGenericConfig;
  genre: IGenericConfig;
  movie: IGenericConfig;

  constructor() {
    this.category = new ModuleConfig(CATEGORY_CONFIG_TOKEN);
    this.genre = new ModuleConfig(GENRE_CONFIG_TOKEN);
    this.movie = new ModuleConfig(MOVIE_CONFIG_TOKEN);
  }
}
