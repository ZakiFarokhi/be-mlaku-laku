import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripStatus } from '@prisma/client';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(touristId: string, dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        ...dto,
        touristId,
        status: TripStatus.PLANNED,
      },
    });
  }

  async findAll() {
    return this.prisma.trip.findMany({
      include: { Tourist: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMine(touristId: string) {
    return this.prisma.trip.findMany({
      where: { touristId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const trip = await this.prisma.trip.findUnique({ where: { id } });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: string, dto: UpdateTripDto, touristId: string) {
    const trip = await this.findOne(id);
    if (trip.touristId !== touristId) {
      throw new ForbiddenException('You can only update your own trip');
    }

    return this.prisma.trip.update({
      where: { id },
      data: dto,
    });
  }

  async cancel(id: string, touristId: string) {
    const trip = await this.findOne(id);
    if (trip.touristId !== touristId) {
      throw new ForbiddenException('You can only cancel your own trip');
    }

    return this.prisma.trip.update({
      where: { id },
      data: { status: TripStatus.CANCELLED },
    });
  }
}
