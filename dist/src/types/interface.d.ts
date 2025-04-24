export declare enum Role {
    OWNER = "OWNER",
    STAFF = "STAFF",
    TOURIST = "TOURIST"
}
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
export declare enum MembershipLevel {
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD"
}
export declare enum TripStatus {
    PLANNED = "PLANNED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare enum PointType {
    EARN = "EARN",
    REDEEM = "REDEEM"
}
export declare enum RedemptionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export interface IUser {
    id: string;
    username: string;
    password: string;
    role: Role;
    createdAt: Date;
}
export interface ITourist {
    id: string;
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
    gender: Gender;
    nationality: string;
    membershipLevel: MembershipLevel;
}
export interface IStaffProfile {
    id: string;
    userId: string;
    fullName: string;
    position: string;
    email: string;
}
export interface ITrip {
    id: string;
    touristId: string;
    destination: string;
    departureDate: Date;
    returnDate: Date;
    price: number;
    status: TripStatus;
    notes?: string;
    createdAt: Date;
}
export interface ITripReview {
    id: string;
    tripId: string;
    touristId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
export interface IPoint {
    id: string;
    userId: string;
    total: number;
    updatedAt: Date;
}
export interface IPointTransaction {
    id: string;
    userId: string;
    amount: number;
    type: PointType;
    description: string;
    createdAt: Date;
}
export interface IReward {
    id: string;
    name: string;
    description: string;
    points: number;
    stock: number;
    createdAt: Date;
}
export interface IRewardRedemption {
    id: string;
    userId: string;
    rewardId: number;
    status: RedemptionStatus;
    createdAt: Date;
}
export interface IWishlist {
    id: string;
    userId: string;
    destination: string;
    notes?: string;
    createdAt: Date;
}
