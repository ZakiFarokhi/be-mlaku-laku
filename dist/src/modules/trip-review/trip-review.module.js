"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripReviewModule = void 0;
const common_1 = require("@nestjs/common");
const trip_review_service_1 = require("./trip-review.service");
const trip_review_controller_1 = require("./trip-review.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let TripReviewModule = class TripReviewModule {
};
exports.TripReviewModule = TripReviewModule;
exports.TripReviewModule = TripReviewModule = __decorate([
    (0, common_1.Module)({
        controllers: [trip_review_controller_1.TripReviewController],
        providers: [trip_review_service_1.TripReviewService, prisma_service_1.PrismaService],
    })
], TripReviewModule);
//# sourceMappingURL=trip-review.module.js.map