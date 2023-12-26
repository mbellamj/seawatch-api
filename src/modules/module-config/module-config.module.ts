import { IModuleConfigService } from '@core/abstracts';
import { Module } from '@nestjs/common';
import { ModuleConfigService } from './module-config.service';

@Module({
  providers: [
    {
      provide: IModuleConfigService,
      useClass: ModuleConfigService,
    },
  ],
  exports: [IModuleConfigService],
})
export class ModuleConfigModule {}
