import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        username: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
}
