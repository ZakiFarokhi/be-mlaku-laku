import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { RedemptionStatus } from '@prisma/client';
export declare class RewardController {
    private readonly rewardService;
    constructor(rewardService: RewardService);
    create(dto: CreateRewardDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    findAll(includeDeleted?: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }[]>;
    update(id: string, dto: UpdateRewardDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        points: number;
        stock: number;
    }>;
    redeem(dto: RedeemRewardDto, req: any): Promise<{
        message: string;
    }>;
    getMyRedemptions(req: any): Promise<({
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
    updateRedemption(id: string, status: RedemptionStatus): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        rewardId: string;
        status: import(".prisma/client").$Enums.RedemptionStatus;
    }>;
}
