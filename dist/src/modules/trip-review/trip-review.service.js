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
exports.TripReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TripReviewService = class TripReviewService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addReview(userId, dto) {
        const tourist = await this.prisma.tourist.findFirst({
            where: { userId },
        });
        if (!tourist)
            throw new common_1.NotFoundException('Tourist not found');
        return this.prisma.tripReview.create({
            data: {
                ...dto,
                touristId: tourist.id,
            },
        });
    }
    async getTripReviews(tripId) {
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
    async updateReview(id, dto) {
        return this.prisma.tripReview.update({
            where: { id },
            data: dto,
        });
    }
    async softDeleteReview(id) {
        return this.prisma.tripReview.update({
            where: { id },
            data: {
                deleted: true,
            },
        });
    }
};
exports.TripReviewService = TripReviewService;
exports.TripReviewService = TripReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripReviewService);
//# sourceMappingURL=trip-review.service.js.map