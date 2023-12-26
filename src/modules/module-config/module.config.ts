import { ICacheConfig, IDatabaseConfig, IGenericConfig } from '@core/abstracts';
import { get } from 'env-var';

export class ModuleConfig implements IGenericConfig {
  private useSSL: boolean;

  constructor(private readonly name: string) {
    this.useSSL = get(`${this.name}_MODULE_USE_SSL`).asBoolStrict();
  }

  getCacheConfig(): ICacheConfig {
    return {
      name: this.name,
      ssl: this.useSSL,
      host: get(`${this.name}_CACHE_HOST`).asString(),
      port: get(`${this.name}_CACHE_PORT`).asPortNumber(),
      username: get(`${this.name}_CACHE_USERNAME`).asString(),
      password: get(`${this.name}_CACHE_PASSWORD`).asString(),
    };
  }

  getDatabaseConfig(): IDatabaseConfig {
    let sslConfig = {};
    if (this.useSSL) {
      sslConfig = {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      };
    }

    return {
      name: this.name,
      database: get(`${this.name}_DATABASE_NAME`).asString(),
      host: get(`${this.name}_DATABASE_HOST`).asString(),
      port: get(`${this.name}_DATABASE_PORT`).asPortNumber(),
      username: get(`${this.name}_DATABASE_USERNAME`).asString(),
      password: get(`${this.name}_DATABASE_PASSWORD`).asString(),
      connectTimeoutMS: 5000,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
      migrationsRun: true,
      ...sslConfig,
    };
  }
}
