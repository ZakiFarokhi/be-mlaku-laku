import { PointService } from './point.service';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
export declare class PointController {
    private readonly pointService;
    constructor(pointService: PointService);
    getMyPoint(req: any): Promise<{
        id: string;
        userId: string;
        total: number;
        updatedAt: Date;
    }>;
    getMyHistory(req: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string;
        type: import(".prisma/client").$Enums.PointType;
        amount: number;
    }[]>;
    createTransaction(req: any, dto: CreatePointTransactionDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        description: string;
        type: import(".prisma/client").$Enums.PointType;
        amount: number;
    }>;
}
