import { Test, TestingModule } from '@nestjs/testing';
import { TripReviewController } from './trip-review.controller';
import { TripReviewService } from './trip-review.service';

describe('TripReviewController', () => {
  let controller: TripReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripReviewController],
      providers: [TripReviewService],
    }).compile();

    controller = module.get<TripReviewController>(TripReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
