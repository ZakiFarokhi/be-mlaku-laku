import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    createForSelf(req: any, dto: CreateTripDto): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    createForTourist(touristId: string, dto: CreateTripDto): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<({
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
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    })[]>;
    findMine(req: any): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateTripDto, req: any): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }>;
    cancel(id: string, req: any): Promise<{
        id: string;
        touristId: string;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        status: import(".prisma/client").$Enums.TripStatus;
        notes: string | null;
        createdAt: Date;
    }>;
}
