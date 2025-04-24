import { PrismaService } from '../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createWishlist(userId: string, dto: CreateWishlistDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        destination: string;
        notes: string | null;
    }>;
    getWishlist(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        destination: string;
        notes: string | null;
    }[]>;
    updateWishlist(id: string, dto: UpdateWishlistDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        destination: string;
        notes: string | null;
    }>;
    deleteWishlist(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        destination: string;
        notes: string | null;
    }>;
    getAllWishlist(): Promise<({
        User: {
            id: string;
            username: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            touristId: string | null;
            staffProfileId: string | null;
            pointId: string | null;
            isDeleted: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        destination: string;
        notes: string | null;
    })[]>;
}
