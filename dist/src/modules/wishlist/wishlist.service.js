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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WishlistService = class WishlistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWishlist(userId, dto) {
        return this.prisma.wishlist.create({
            data: {
                ...dto,
                userId,
            },
        });
    }
    async getWishlist(userId) {
        return this.prisma.wishlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateWishlist(id, dto) {
        return this.prisma.wishlist.update({
            where: { id },
            data: dto,
        });
    }
    async deleteWishlist(id) {
        return this.prisma.wishlist.delete({
            where: { id },
        });
    }
    async getAllWishlist() {
        return this.prisma.wishlist.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                User: true,
            },
        });
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map