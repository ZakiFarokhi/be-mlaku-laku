import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        touristId: string | null;
        staffProfileId: string | null;
        pointId: string | null;
        isDeleted: boolean;
    }>;
    update(id: string, dto: UpdateUserDto, currentUserId: string): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        touristId: string | null;
        staffProfileId: string | null;
        pointId: string | null;
        isDeleted: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        touristId: string | null;
        staffProfileId: string | null;
        pointId: string | null;
        isDeleted: boolean;
    }[]>;
    softDelete(id: string): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        touristId: string | null;
        staffProfileId: string | null;
        pointId: string | null;
        isDeleted: boolean;
    }>;
}
