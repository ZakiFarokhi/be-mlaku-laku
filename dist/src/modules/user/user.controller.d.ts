import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    getMe(req: any): Promise<{
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
    updateProfile(id: string, dto: UpdateUserDto, req: any): Promise<{
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
