import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RedeemRewardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rewardId: string;
}
