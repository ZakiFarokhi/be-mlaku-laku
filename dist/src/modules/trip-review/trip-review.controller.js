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
exports.TripReviewController = void 0;
const common_1 = require("@nestjs/common");
const trip_review_service_1 = require("./trip-review.service");
const create_trip_review_dto_1 = require("./dto/create-trip-review.dto");
const update_trip_review_dto_1 = require("./dto/update-trip-review.dto");
const swagger_1 = require("@nestjs/swagger");
const review_owner_guard_1 = require("./guards/review-owner.guard");
let TripReviewController = class TripReviewController {
    constructor(tripReviewService) {
        this.tripReviewService = tripReviewService;
    }
    async addReview(req, dto) {
        return this.tripReviewService.addReview(req.user.id, dto);
    }
    async getTripReviews(tripId) {
        return this.tripReviewService.getTripReviews(tripId);
    }
    async getAllReviews() {
        return this.tripReviewService.getAllReviews();
    }
    async updateReview(id, dto) {
        return this.tripReviewService.updateReview(id, dto);
    }
    async deleteReview(id) {
        return this.tripReviewService.softDeleteReview(id);
    }
};
exports.TripReviewController = TripReviewController;
__decorate([
    (0, common_1.Post)('review'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a trip review' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_trip_review_dto_1.CreateTripReviewDto]),
    __metadata("design:returntype", Promise)
], TripReviewController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(':tripId/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a trip' }),
    __param(0, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripReviewController.prototype, "getTripReviews", null);
__decorate([
    (0, common_1.Get)('admin/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Admin - Get all trip reviews' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TripReviewController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Patch)('review/:id'),
    (0, common_1.UseGuards)(review_owner_guard_1.ReviewOwnerGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a trip review' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trip_review_dto_1.UpdateTripReviewDto]),
    __metadata("design:returntype", Promise)
], TripReviewController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)('review/:id'),
    (0, common_1.UseGuards)(review_owner_guard_1.ReviewOwnerGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a trip review' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripReviewController.prototype, "deleteReview", null);
exports.TripReviewController = TripReviewController = __decorate([
    (0, swagger_1.ApiTags)('trip-review'),
    (0, common_1.Controller)('trip-review'),
    __metadata("design:paramtypes", [trip_review_service_1.TripReviewService])
], TripReviewController);
//# sourceMappingURL=trip-review.controller.js.map