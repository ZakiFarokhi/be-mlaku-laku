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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointController = void 0;
const common_1 = require("@nestjs/common");
const point_service_1 = require("./point.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
const client_1 = require("@prisma/client");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_point_transaction_dto_1 = require("./dto/create-point-transaction.dto");
const swagger_1 = require("@nestjs/swagger");
let PointController = class PointController {
    constructor(pointService) {
        this.pointService = pointService;
    }
    async getMyPoint(req) {
        return this.pointService.getPointByUserId(req.user.userId);
    }
    async getMyHistory(req) {
        return this.pointService.getHistory(req.user.userId);
    }
    async createTransaction(req, dto) {
        return this.pointService.createTransaction(req.body.userId ?? req.user.userId, dto);
    }
};
exports.PointController = PointController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get total point of current user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "getMyPoint", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get point history of current user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "getMyHistory", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorators_1.Roles)(client_1.Role.OWNER, client_1.Role.STAFF),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add or remove point manually (admin only)' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_point_transaction_dto_1.CreatePointTransactionDto]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "createTransaction", null);
exports.PointController = PointController = __decorate([
    (0, swagger_1.ApiTags)('Points'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('points'),
    __metadata("design:paramtypes", [point_service_1.PointService])
], PointController);
//# sourceMappingURL=point.controller.js.map