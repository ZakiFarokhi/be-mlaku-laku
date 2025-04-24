import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { RedemptionStatus } from '@prisma/client';
export declare class RewardService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRewardDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    findAll(includeDeleted?: boolean): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    update(id: string, dto: UpdateRewardDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    redeem(userId: string, dto: RedeemRewardDto): Promise<{
        message: string;
    }>;
    getRedemptions(userId: string, isAdmin?: boolean): Promise<({
        reward: {
            id: string;
            createdAt: Date;
            name: string;
            description: string;
            points: number;
            stock: number;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        rewardId: string;
        status: import(".prisma/client").$Enums.RedemptionStatus;
    })[]>;
    updateRedemptionStatus(id: string, status: RedemptionStatus): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        rewardId: string;
        status: import(".prisma/client").$Enums.RedemptionStatus;
    }>;
}
