import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikrotikModule } from './mikrotik/mikrotik.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MikrotikModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6108',
      database: 'ssh',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Yalnızca development ortamında kullanılmalıdır
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
