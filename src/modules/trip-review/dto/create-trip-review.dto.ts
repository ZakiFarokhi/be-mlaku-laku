import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateTripReviewDto {
  @ApiProperty()
  @IsMongoId()
  tripId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
