import { Test, TestingModule } from '@nestjs/testing';
import { TripReviewService } from './trip-review.service';

describe('TripReviewService', () => {
  let service: TripReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripReviewService],
    }).compile();

    service = module.get<TripReviewService>(TripReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
