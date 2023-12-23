import { get } from 'env-var';

export class ModuleConfig {
  constructor(private readonly name: string) {}

  public readonly USE_SSL = get(`${this.name}_MODULE_USE_SSL`).asBoolStrict();

  /** DATABASE CONFIG SECTION */
  public readonly DATABASE_HOST = get(`${this.name}_DATABASE_HOST`).asString();
  public readonly DATABASE_PORT = get(
    `${this.name}_DATABASE_PORT`,
  ).asPortNumber();
  public readonly DATABASE_NAME = get(`${this.name}_DATABASE_NAME`).asString();
  public readonly DATABASE_USERNAME = get(
    `${this.name}_DATABASE_USERNAME`,
  ).asString();
  public readonly DATABASE_PASSWORD = get(
    `${this.name}_DATABASE_PASSWORD`,
  ).asString();

  /** REDIS CONFIG SECTION */
  public readonly REDIS_HOST = get(`${this.name}_REDIS_HOST`).asString();
  public readonly REDIS_PORT = get(`${this.name}_REDIS_PORT`).asPortNumber();
  public readonly REDIS_DB_NAME = get(`${this.name}_REDIS_DB_NAME`).asString();
  public readonly REDIS_USERNAME = get(
    `${this.name}_REDIS_USERNAME`,
  ).asString();
  public readonly REDIS_PASSWORD = get(
    `${this.name}_REDIS_PASSWORD`,
  ).asString();
}
