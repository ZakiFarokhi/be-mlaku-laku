import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role, RedemptionStatus } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  // CRUD Reward (Admin Only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new reward (Admin)' })
  create(@Body() dto: CreateRewardDto) {
    return this.rewardService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List available rewards' })
  findAll(@Query('includeDeleted') includeDeleted?: string) {
    return this.rewardService.findAll(includeDeleted === 'true');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update reward (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateRewardDto) {
    return this.rewardService.update(id, dto);
  }

  @Post('redeem')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Redeem a reward (User)' })
  redeem(@Body() dto: RedeemRewardDto, @Request() req) {
    return this.rewardService.redeem(req.user.userId, dto);
  }

  @Get('redemptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my reward redemptions or all (admin)' })
  getMyRedemptions(@Request() req) {
    const isAdmin = req.user.role === 'OWNER' || req.user.role === 'STAFF';
    return this.rewardService.getRedemptions(req.user.userId, isAdmin);
  }

  @Patch('redemptions/:id/:status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve or reject reward redemption (Admin)' })
  updateRedemption(
    @Param('id') id: string,
    @Param('status') status: RedemptionStatus,
  ) {
    return this.rewardService.updateRedemptionStatus(id, status);
  }
}
