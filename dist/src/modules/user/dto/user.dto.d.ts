import { Role } from '@prisma/client';
export declare class UserDto {
    id: string;
    username: string;
    role: Role;
    createdAt: Date;
}
