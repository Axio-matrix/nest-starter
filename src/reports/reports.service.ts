import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { createReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: createReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.users = user;
    return this.repo.save(report);
  }
}
