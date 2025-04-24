// guards/review-owner.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ReviewOwnerGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reviewId = request.params.id;

    const review = await this.prisma.tripReview.findUnique({
      where: { id: reviewId },
    });

    if (!review) throw new NotFoundException('Review not found');

    const tourist = await this.prisma.tourist.findFirst({
      where: { userId: user.id },
    });

    if (!tourist || review.touristId !== tourist.id) {
      throw new ForbiddenException('You are not allowed to modify this review');
    }

    return true;
  }
}
