import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
}
