import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Points')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get()
  @ApiOperation({ summary: 'Get total point of current user' })
  async getMyPoint(@Req() req) {
    return this.pointService.getPointByUserId(req.user.userId);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get point history of current user' })
  async getMyHistory(@Req() req) {
    return this.pointService.getHistory(req.user.userId);
  }

  @Post()
  @Roles(Role.OWNER, Role.STAFF)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Add or remove point manually (admin only)' })
  async createTransaction(@Req() req, @Body() dto: CreatePointTransactionDto) {
    return this.pointService.createTransaction(
      req.body.userId ?? req.user.userId,
      dto,
    );
  }
}
