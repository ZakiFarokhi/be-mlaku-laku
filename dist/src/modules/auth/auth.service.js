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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const interface_1 = require("../../types/interface");
let AuthService = class AuthService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (!user || !(await bcryptjs.compare(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            username: user.username,
            role: user.role,
        };
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existing) {
            throw new common_1.ConflictException('Username already taken');
        }
        const hashedPassword = await bcryptjs.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                role: dto.role,
                createdAt: new Date(),
            },
        });
        if (dto.role === interface_1.Role.TOURIST) {
            await this.prisma.tourist.create({
                data: {
                    userId: user.id,
                    fullName: dto.fullName || '',
                    email: dto.email || '',
                    birthDate: new Date('1990-01-01'),
                    phoneNumber: '',
                    gender: 'OTHER',
                    nationality: 'ID',
                },
            });
        }
        return {
            message: 'User registered successfully',
            userId: user.id,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map