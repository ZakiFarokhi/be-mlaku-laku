import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({ example: '661f0c25c2e9c6d80ffbf0f2' })
  id: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'TOURIST', enum: Role })
  role: Role;

  @ApiProperty({ example: '2024-04-20T12:00:00.000Z' })
  createdAt: Date;
}
