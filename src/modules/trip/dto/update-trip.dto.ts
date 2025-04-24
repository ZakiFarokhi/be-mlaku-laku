import { ApiPropertyOptional } from '@nestjs/swagger';
import { TripStatus } from '@prisma/client';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateTripDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  departureDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  returnDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TripStatus)
  status?: TripStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
