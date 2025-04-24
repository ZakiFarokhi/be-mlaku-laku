import { TripStatus } from '@prisma/client';
export declare class UpdateTripDto {
    destination?: string;
    departureDate?: Date;
    returnDate?: Date;
    price?: number;
    status?: TripStatus;
    notes?: string;
}
