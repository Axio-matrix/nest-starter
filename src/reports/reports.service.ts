import { Get, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { createReportDto } from './dtos/create-report.dto';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dtos';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: createReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  creatEstimate({ make, model, lat, lng, year, mileage }: GetEstimateDto) {
  return this.repo
    .createQueryBuilder()
    .select('AVG(price)', 'price')
    .where('make = :make', { make })
    .andWhere('approved IS TRUE')
    .andWhere('model = :model', { model })
    .andWhere('lat BETWEEN :lat - 5 AND :lat + 5', { lat })
    .andWhere('lng BETWEEN :lng - 5 AND :lng + 5', { lng })
    .andWhere('year BETWEEN :year - 3 AND :year + 3', { year })
    .orderBy('ABS(mileage - :mileage)', 'DESC')
    .setParameters({ mileage })
    .limit(3)
    .getRawOne();
}

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;

    return this.repo.save(report);
  }
}
