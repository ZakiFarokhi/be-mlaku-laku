import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../../types/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || !(await bcryptjs.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      username: user.username,
      role: user.role,
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existing) {
      throw new ConflictException('Username already taken');
    }

    const hashedPassword = await bcryptjs.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
        role: dto.role,
        createdAt: new Date(),
      },
    });

    // Optionally create related profile
    if (dto.role === Role.TOURIST) {
      await this.prisma.tourist.create({
        data: {
          userId: user.id,
          fullName: dto.fullName || '',
          email: dto.email || '',
          birthDate: new Date('1990-01-01'), // Default if none
          phoneNumber: '',
          gender: 'OTHER',
          nationality: 'ID',
        },
      });
    }

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }
}
