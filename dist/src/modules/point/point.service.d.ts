import { PrismaService } from '../prisma/prisma.service';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
export declare class PointService {
    private prisma;
    constructor(prisma: PrismaService);
    getPointByUserId(userId: string): Promise<{
        id: string;
        userId: string;
        total: number;
        updatedAt: Date;
    }>;
    getHistory(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string;
        type: import(".prisma/client").$Enums.PointType;
        amount: number;
    }[]>;
    createTransaction(userId: string, dto: CreatePointTransactionDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string;
        type: import(".prisma/client").$Enums.PointType;
        amount: number;
    }>;
}
