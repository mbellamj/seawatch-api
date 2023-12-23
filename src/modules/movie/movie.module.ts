import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    // RedisModule.forRoot(genreRedisModuleConfig, MODULE_NAME),
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
