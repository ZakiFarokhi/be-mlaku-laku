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
exports.RewardController = void 0;
const common_1 = require("@nestjs/common");
const reward_service_1 = require("./reward.service");
const create_reward_dto_1 = require("./dto/create-reward.dto");
const update_reward_dto_1 = require("./dto/update-reward.dto");
const redeem_reward_dto_1 = require("./dto/redeem-reward.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
const roles_guard_1 = require("../auth/guards/roles.guard");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let RewardController = class RewardController {
    constructor(rewardService) {
        this.rewardService = rewardService;
    }
    create(dto) {
        return this.rewardService.create(dto);
    }
    findAll(includeDeleted) {
        return this.rewardService.findAll(includeDeleted === 'true');
    }
    update(id, dto) {
        return this.rewardService.update(id, dto);
    }
    redeem(dto, req) {
        return this.rewardService.redeem(req.user.userId, dto);
    }
    getMyRedemptions(req) {
        const isAdmin = req.user.role === 'OWNER' || req.user.role === 'STAFF';
        return this.rewardService.getRedemptions(req.user.userId, isAdmin);
    }
    updateRedemption(id, status) {
        return this.rewardService.updateRedemptionStatus(id, status);
    }
};
exports.RewardController = RewardController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.OWNER, client_1.Role.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new reward (Admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reward_dto_1.CreateRewardDto]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List available rewards' }),
    __param(0, (0, common_1.Query)('includeDeleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.OWNER, client_1.Role.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update reward (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reward_dto_1.UpdateRewardDto]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('redeem'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Redeem a reward (User)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redeem_reward_dto_1.RedeemRewardDto, Object]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "redeem", null);
__decorate([
    (0, common_1.Get)('redemptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get my reward redemptions or all (admin)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "getMyRedemptions", null);
__decorate([
    (0, common_1.Patch)('redemptions/:id/:status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(client_1.Role.OWNER, client_1.Role.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject reward redemption (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "updateRedemption", null);
exports.RewardController = RewardController = __decorate([
    (0, swagger_1.ApiTags)('Reward'),
    (0, common_1.Controller)('reward'),
    __metadata("design:paramtypes", [reward_service_1.RewardService])
], RewardController);
//# sourceMappingURL=reward.controller.js.map