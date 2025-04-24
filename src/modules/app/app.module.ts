import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { LoggerModule } from '../logger/logger.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TripModule } from '../trip/trip.module';
import { PointModule } from '../point/point.module';
import { RewardModule } from '../reward/reward.module';
import { WishlistModule } from '../wishlist/wishlist.module';

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    AuthModule,
    UserModule,
    TripModule,
    RewardModule,
    PointModule,
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
