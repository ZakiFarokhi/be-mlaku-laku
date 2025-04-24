"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RewardService = class RewardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.reward.create({ data: dto });
    }
    async findAll(includeDeleted = false) {
        return this.prisma.reward.findMany({
            where: includeDeleted ? {} : { stock: { gt: 0 } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const reward = await this.prisma.reward.findUnique({ where: { id } });
        if (!reward)
            throw new common_1.NotFoundException('Reward not found');
        return reward;
    }
    async update(id, dto) {
        return this.prisma.reward.update({ where: { id }, data: dto });
    }
    async remove(id) {
        return this.prisma.reward.delete({ where: { id } });
    }
    async redeem(userId, dto) {
        const reward = await this.prisma.reward.findUnique({
            where: { id: dto.rewardId },
        });
        if (!reward || reward.stock <= 0)
            throw new common_1.BadRequestException('Reward tidak tersedia');
        const userPoint = await this.prisma.point.findUnique({ where: { userId } });
        if (!userPoint || userPoint.total < reward.points) {
            throw new common_1.BadRequestException('Poin tidak mencukupi');
        }
        await this.prisma.$transaction([
            this.prisma.rewardRedemption.create({
                data: {
                    userId,
                    rewardId: reward.id,
                    status: client_1.RedemptionStatus.PENDING,
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
    async getRedemptions(userId, isAdmin = false) {
        return this.prisma.rewardRedemption.findMany({
            where: isAdmin ? {} : { userId },
            include: {
                reward: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateRedemptionStatus(id, status) {
        return this.prisma.rewardRedemption.update({
            where: { id },
            data: { status },
        });
    }
};
exports.RewardService = RewardService;
exports.RewardService = RewardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RewardService);
//# sourceMappingURL=reward.service.js.map