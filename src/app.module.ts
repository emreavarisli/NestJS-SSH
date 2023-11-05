import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikrotikModule } from './mikrotik/mikrotik.module';

@Module({
  imports: [MikrotikModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
