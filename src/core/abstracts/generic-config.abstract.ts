import { IPrimitive } from '@core/interfaces';

export abstract class IGenericConfig {
  abstract getCacheConfig(): ICacheConfig;
  abstract getDatabaseConfig(): IDatabaseConfig;
}

export interface ICacheConfig {
  host: string;
  port: number;
  name?: string;
  database?: string;
  username?: string;
  password?: string;
  ssl?: boolean;
}

export interface IDatabaseConfig extends Record<string, IPrimitive> {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  database: string;
}
