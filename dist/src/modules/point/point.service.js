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
exports.PointService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PointService = class PointService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPointByUserId(userId) {
        return this.prisma.point.findUnique({
            where: { userId },
        });
    }
    async getHistory(userId) {
        return this.prisma.pointTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createTransaction(userId, dto) {
        const userPoint = await this.prisma.point.findUnique({ where: { userId } });
        if (!userPoint)
            throw new common_1.NotFoundException('Point record not found');
        let total = userPoint.total;
        if (dto.type === client_1.PointType.EARN) {
            total += dto.amount;
        }
        else {
            total -= dto.amount;
            if (total < 0)
                total = 0;
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
};
exports.PointService = PointService;
exports.PointService = PointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PointService);
//# sourceMappingURL=point.service.js.map