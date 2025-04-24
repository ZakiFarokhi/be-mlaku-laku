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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TripService = class TripService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(touristId, dto) {
        return this.prisma.trip.create({
            data: {
                ...dto,
                touristId,
                status: client_1.TripStatus.PLANNED,
            },
        });
    }
    async findAll() {
        return this.prisma.trip.findMany({
            include: { Tourist: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findMine(touristId) {
        return this.prisma.trip.findMany({
            where: { touristId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const trip = await this.prisma.trip.findUnique({ where: { id } });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        return trip;
    }
    async update(id, dto, touristId) {
        const trip = await this.findOne(id);
        if (trip.touristId !== touristId) {
            throw new common_1.ForbiddenException('You can only update your own trip');
        }
        return this.prisma.trip.update({
            where: { id },
            data: dto,
        });
    }
    async cancel(id, touristId) {
        const trip = await this.findOne(id);
        if (trip.touristId !== touristId) {
            throw new common_1.ForbiddenException('You can only cancel your own trip');
        }
        return this.prisma.trip.update({
            where: { id },
            data: { status: client_1.TripStatus.CANCELLED },
        });
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripService);
//# sourceMappingURL=trip.service.js.map