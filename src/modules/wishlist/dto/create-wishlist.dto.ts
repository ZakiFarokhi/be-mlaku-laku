import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsString()
  notes?: string;
}
