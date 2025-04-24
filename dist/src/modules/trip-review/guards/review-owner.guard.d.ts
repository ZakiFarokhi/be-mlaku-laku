import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Reflector } from '@nestjs/core';
export declare class ReviewOwnerGuard implements CanActivate {
    private prisma;
    private reflector;
    constructor(prisma: PrismaService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
