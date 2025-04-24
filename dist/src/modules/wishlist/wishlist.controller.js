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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const create_wishlist_dto_1 = require("./dto/create-wishlist.dto");
const update_wishlist_dto_1 = require("./dto/update-wishlist.dto");
const swagger_1 = require("@nestjs/swagger");
const wishlist_owner_guard_1 = require("./guards/wishlist-owner.guard");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    async createWishlist(req, dto) {
        return this.wishlistService.createWishlist(req.user.id, dto);
    }
    async getWishlist(req) {
        return this.wishlistService.getWishlist(req.user.id);
    }
    async updateWishlist(id, dto) {
        return this.wishlistService.updateWishlist(id, dto);
    }
    async deleteWishlist(id) {
        return this.wishlistService.deleteWishlist(id);
    }
    async getAllWishlist() {
        return this.wishlistService.getAllWishlist();
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a destination to the wishlist' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_wishlist_dto_1.CreateWishlistDto]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "createWishlist", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get the user's wishlist" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a destination in the wishlist' }),
    (0, common_1.UseGuards)(wishlist_owner_guard_1.WishlistOwnerGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wishlist_dto_1.UpdateWishlistDto]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "updateWishlist", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(wishlist_owner_guard_1.WishlistOwnerGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a destination from the wishlist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "deleteWishlist", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, swagger_1.ApiOperation)({ summary: "Admin - Get all users' wishlists" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "getAllWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, swagger_1.ApiTags)('Wishlist'),
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map