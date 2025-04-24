import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripReviewService } from './trip-review.service';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewOwnerGuard } from './guards/review-owner.guard';

@ApiTags('trip-review')
@Controller('trip-review')
export class TripReviewController {
  constructor(private readonly tripReviewService: TripReviewService) {}

  @Post('review')
  @ApiOperation({ summary: 'Add a trip review' })
  async addReview(@Req() req: any, @Body() dto: CreateTripReviewDto) {
    return this.tripReviewService.addReview(req.user.id, dto);
  }

  @Get(':tripId/reviews')
  @ApiOperation({ summary: 'Get reviews for a trip' })
  async getTripReviews(@Param('tripId') tripId: string) {
    return this.tripReviewService.getTripReviews(tripId);
  }

  @Get('admin/reviews')
  @ApiOperation({ summary: 'Admin - Get all trip reviews' })
  async getAllReviews() {
    return this.tripReviewService.getAllReviews();
  }

  @Patch('review/:id')
  @UseGuards(ReviewOwnerGuard)
  @ApiOperation({ summary: 'Update a trip review' })
  async updateReview(
    @Param('id') id: string,
    @Body() dto: UpdateTripReviewDto,
  ) {
    return this.tripReviewService.updateReview(id, dto);
  }

  @Delete('review/:id')
  @UseGuards(ReviewOwnerGuard)
  @ApiOperation({ summary: 'Soft delete a trip review' })
  async deleteReview(@Param('id') id: string) {
    return this.tripReviewService.softDeleteReview(id);
  }
}
