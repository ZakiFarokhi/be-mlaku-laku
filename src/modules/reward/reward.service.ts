import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { RedemptionStatus } from '@prisma/client';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  // CRUD Reward
  async create(dto: CreateRewardDto) {
    return this.prisma.reward.create({ data: dto });
  }

  async findAll(includeDeleted = false) {
    return this.prisma.reward.findMany({
      where: includeDeleted ? {} : { stock: { gt: 0 } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const reward = await this.prisma.reward.findUnique({ where: { id } });
    if (!reward) throw new NotFoundException('Reward not found');
    return reward;
  }

  async update(id: string, dto: UpdateRewardDto) {
    return this.prisma.reward.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.reward.delete({ where: { id } });
  }

  // Redemption
  async redeem(userId: string, dto: RedeemRewardDto) {
    const reward = await this.prisma.reward.findUnique({
      where: { id: dto.rewardId },
    });
    if (!reward || reward.stock <= 0)
      throw new BadRequestException('Reward tidak tersedia');

    const userPoint = await this.prisma.point.findUnique({ where: { userId } });
    if (!userPoint || userPoint.total < reward.points) {
      throw new BadRequestException('Poin tidak mencukupi');
    }

    // Buat redemption request dan kurangi point
    await this.prisma.$transaction([
      this.prisma.rewardRedemption.create({
        data: {
          userId,
          rewardId: reward.id,
          status: RedemptionStatus.PENDING,
        },
      }),
      this.prisma.point.update({
        where: { userId },
        data: { total: { decrement: reward.points } },
      }),
      this.prisma.pointTransaction.create({
        data: {
          userId,
          amount: reward.points,
          type: 'REDEEM',
          description: `Redeem reward ${reward.name}`,
        },
      }),
    ]);
    return { message: 'Reward redemption request created' };
  }

  async getRedemptions(userId: string, isAdmin = false) {
    return this.prisma.rewardRedemption.findMany({
      where: isAdmin ? {} : { userId },
      include: {
        reward: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRedemptionStatus(id: string, status: RedemptionStatus) {
    return this.prisma.rewardRedemption.update({
      where: { id },
      data: { status },
    });
  }
}
