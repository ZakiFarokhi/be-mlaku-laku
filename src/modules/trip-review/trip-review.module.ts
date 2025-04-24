import { Module } from '@nestjs/common';
import { TripReviewService } from './trip-review.service';
import { TripReviewController } from './trip-review.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TripReviewController],
  providers: [TripReviewService, PrismaService],
})
export class TripReviewModule {}
