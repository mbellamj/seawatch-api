import { CategoryModule } from '@modules/category';
import { DatabaseModule } from '@modules/database';
import { GenreModule } from '@modules/genre';
import { ModuleConfigService } from '@modules/module-config';
import { MovieModule } from '@modules/movie';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './modules/cache/cache.module';

config();

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    GenreModule,
    CategoryModule,
    MovieModule,
    DatabaseModule.forRoot(new ModuleConfigService()),
    CacheModule.forRoot(new ModuleConfigService()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
