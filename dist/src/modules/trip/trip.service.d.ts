import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripService {
    private prisma;
    constructor(prisma: PrismaService);
    create(touristId: string, dto: CreateTripDto): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
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
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
    })[]>;
    findMine(touristId: string): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
    }>;
    update(id: string, dto: UpdateTripDto, touristId: string): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
    }>;
    cancel(id: string, touristId: string): Promise<{
        id: string;
        createdAt: Date;
        touristId: string;
        status: import(".prisma/client").$Enums.TripStatus;
        destination: string;
        departureDate: Date;
        returnDate: Date;
        price: number;
        notes: string | null;
    }>;
}
