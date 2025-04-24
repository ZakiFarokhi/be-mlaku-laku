import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WishlistOwnerGuard } from './guards/wishlist-owner.guard';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @ApiOperation({ summary: 'Add a destination to the wishlist' })
  async createWishlist(@Req() req: any, @Body() dto: CreateWishlistDto) {
    return this.wishlistService.createWishlist(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: "Get the user's wishlist" })
  async getWishlist(@Req() req: any) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a destination in the wishlist' })
  @UseGuards(WishlistOwnerGuard)
  async updateWishlist(
    @Param('id') id: string,
    @Body() dto: UpdateWishlistDto,
  ) {
    return this.wishlistService.updateWishlist(id, dto);
  }

  @Delete(':id')
  @UseGuards(WishlistOwnerGuard)
  @ApiOperation({ summary: 'Delete a destination from the wishlist' })
  async deleteWishlist(@Param('id') id: string) {
    return this.wishlistService.deleteWishlist(id);
  }

  @Get('admin')
  @ApiOperation({ summary: "Admin - Get all users' wishlists" })
  async getAllWishlist() {
    return this.wishlistService.getAllWishlist();
  }
}
