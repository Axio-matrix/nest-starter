import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { reportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dtos';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getEstimate(@Query() query: GetEstimateDto ) {
    return this.reportsService.creatEstimate(query)
  }

  @UseGuards(AuthGuard)
  @Serialize(reportDto)
  @Post()
  createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(@Param('id', ParseIntPipe) id: number, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }
}
