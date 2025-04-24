import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'securePass123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ enum: Role, example: Role.TOURIST, description: 'User role' })
  @IsEnum(Role)
  role: Role;

  // Optional: additional fields for tourist registration
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Full name of the tourist',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Email of the tourist',
  })
  @IsOptional()
  @IsString()
  email?: string;
}
