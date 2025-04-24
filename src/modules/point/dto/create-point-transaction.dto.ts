import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PointType } from '@prisma/client';

export class CreatePointTransactionDto {
  @ApiProperty({ enum: PointType })
  @IsEnum(PointType)
  type: PointType;

  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
