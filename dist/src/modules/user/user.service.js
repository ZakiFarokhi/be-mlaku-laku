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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findFirst({
            where: { id, isDeleted: false },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, dto, currentUserId) {
        if (id !== currentUserId) {
            throw new common_1.ForbiddenException('You can only update your own account');
        }
        const data = {};
        if (dto.username)
            data.username = dto.username;
        if (dto.password)
            data.password = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    async softDelete(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map