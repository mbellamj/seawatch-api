import { IGenericConfig } from './generic-config.abstract';

export abstract class IModuleConfigService {
  abstract category: IGenericConfig;
  abstract genre: IGenericConfig;
  abstract movie: IGenericConfig;
}
