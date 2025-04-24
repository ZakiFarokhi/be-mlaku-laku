import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripReviewService {
  constructor(private prisma: PrismaService) {}

  // trip.service.ts
  async addReview(userId: string, dto: CreateTripReviewDto) {
    const tourist = await this.prisma.tourist.findFirst({
      where: { userId },
    });
    if (!tourist) throw new NotFoundException('Tourist not found');

    return this.prisma.tripReview.create({
      data: {
        ...dto,
        touristId: tourist.id,
      },
    });
  }

  async getTripReviews(tripId: string) {
    return this.prisma.tripReview.findMany({
      where: {
        tripId,
        deleted: false,
      },
      include: {
        Tourist: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllReviews() {
    return this.prisma.tripReview.findMany({
      where: { deleted: false },
      include: {
        Tourist: true,
        Trip: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateReview(id: string, dto: UpdateTripReviewDto) {
    return this.prisma.tripReview.update({
      where: { id },
      data: dto,
    });
  }

  async softDeleteReview(id: string) {
    return this.prisma.tripReview.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }
}
