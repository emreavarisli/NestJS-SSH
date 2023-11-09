import { Module } from '@nestjs/common';
import { MikrotikController } from './mikrotik.controller';
import { MikrotikService } from './mikrotik.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mikrotik } from './mikrotik.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mikrotik])],
  controllers: [MikrotikController],
  providers: [MikrotikService]
})
export class MikrotikModule { }
