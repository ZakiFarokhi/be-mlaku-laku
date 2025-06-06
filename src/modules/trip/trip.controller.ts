import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Trips')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // Untuk tourist (autentikasi biasa)
  @Post()
  @ApiOperation({ summary: 'Create a new trip (by tourist)' })
  async createForSelf(@Req() req, @Body() dto: CreateTripDto) {
    console.log(req.user);
    const touristId = req.user.userId;
    return this.tripService.create(touristId, dto);
  }

  // Untuk admin/staff menentukan touristId secara eksplisit
  @Post(':touristId')
  @Roles(Role.OWNER, Role.STAFF)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Create a new trip for specific tourist (admin/staff)',
  })
  async createForTourist(
    @Param('touristId') touristId: string,
    @Body() dto: CreateTripDto,
  ) {
    return this.tripService.create(touristId, dto);
  }

  @Get()
  @Roles(Role.OWNER, Role.STAFF)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all trips (admin only)' })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get trips of current user (tourist)' })
  async findMine(@Req() req) {
    return this.tripService.findMine(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  async findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update trip (by tourist)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTripDto,
    @Req() req,
  ) {
    return this.tripService.update(id, dto, req.user.userId);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel trip (soft delete)' })
  async cancel(@Param('id') id: string, @Req() req) {
    return this.tripService.cancel(id, req.user.userId);
  }
}
