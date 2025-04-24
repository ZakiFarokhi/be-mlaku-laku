// wishlist.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async createWishlist(userId: string, dto: CreateWishlistDto) {
    return this.prisma.wishlist.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async getWishlist(userId: string) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateWishlist(id: string, dto: UpdateWishlistDto) {
    return this.prisma.wishlist.update({
      where: { id },
      data: dto,
    });
  }

  async deleteWishlist(id: string) {
    return this.prisma.wishlist.delete({
      where: { id },
    });
  }

  async getAllWishlist() {
    return this.prisma.wishlist.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        User: true, // Include user info
      },
    });
  }
}
