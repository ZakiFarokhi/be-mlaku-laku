import { TripReviewService } from './trip-review.service';
import { CreateTripReviewDto } from './dto/create-trip-review.dto';
import { UpdateTripReviewDto } from './dto/update-trip-review.dto';
export declare class TripReviewController {
    private readonly tripReviewService;
    constructor(tripReviewService: TripReviewService);
    addReview(req: any, dto: CreateTripReviewDto): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        tripId: string;
        rating: number;
        comment: string;
        deleted: boolean;
    }>;
    getTripReviews(tripId: string): Promise<({
        Tourist: {
            id: string;
            userId: string;
            fullName: string;
            email: string;
            phoneNumber: string;
            birthDate: Date;
            gender: import(".prisma/client").$Enums.Gender;
            nationality: string;
            membershipLevel: import(".prisma/client").$Enums.MembershipLevel;
        };
    } & {
        id: string;
        createdAt: Date;
        touristId: string;
        tripId: string;
        rating: number;
        comment: string;
        deleted: boolean;
    })[]>;
    getAllReviews(): Promise<({
        Tourist: {
            id: string;
            userId: string;
            fullName: string;
            email: string;
            phoneNumber: string;
            birthDate: Date;
            gender: import(".prisma/client").$Enums.Gender;
            nationality: string;
            membershipLevel: import(".prisma/client").$Enums.MembershipLevel;
        };
        Trip: {
            id: string;
            createdAt: Date;
            touristId: string;
            status: import(".prisma/client").$Enums.TripStatus;
            destination: string;
            departureDate: Date;
            returnDate: Date;
            price: number;
            notes: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        touristId: string;
        tripId: string;
        rating: number;
        comment: string;
        deleted: boolean;
    })[]>;
    updateReview(id: string, dto: UpdateTripReviewDto): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        tripId: string;
        rating: number;
        comment: string;
        deleted: boolean;
    }>;
    deleteReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        tripId: string;
        rating: number;
        comment: string;
        deleted: boolean;
    }>;
}
