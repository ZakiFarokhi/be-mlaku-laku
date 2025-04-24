import { PointType } from '@prisma/client';
export declare class CreatePointTransactionDto {
    type: PointType;
    amount: number;
    description: string;
}
