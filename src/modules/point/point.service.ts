import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { PointType } from '@prisma/client';

@Injectable()
export class PointService {
  constructor(private prisma: PrismaService) {}

  async getPointByUserId(userId: string) {
    return this.prisma.point.findUnique({
      where: { userId },
    });
  }

  async getHistory(userId: string) {
    return this.prisma.pointTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTransaction(userId: string, dto: CreatePointTransactionDto) {
    const userPoint = await this.prisma.point.findUnique({ where: { userId } });
    if (!userPoint) throw new NotFoundException('Point record not found');

    let total = userPoint.total;
    if (dto.type === PointType.EARN) {
      total += dto.amount;
    } else {
      total -= dto.amount;
      if (total < 0) total = 0;
    }

    await this.prisma.point.update({
      where: { userId },
      data: { total },
    });

    return this.prisma.pointTransaction.create({
      data: {
        userId,
        ...dto,
      },
    });
  }
}
