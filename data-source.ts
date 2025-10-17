import { DataSource } from 'typeorm';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';

let options: any = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  // entities: ['dist/**/*.entity.{js,ts}'],
};

switch (env) {
  case 'development':
    Object.assign(options, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [path.join(__dirname, '/../**/*.entity.js')], // use dist
    });
    break;

  case 'test':
    Object.assign(options, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [path.join(process.cwd(), 'src/**/*.entity.ts')], // use src directly
      synchronize: true,
    });
    break;

  case 'production':
    Object.assign(options, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: [path.join(__dirname, '/../**/*.entity.js')],
      ssl: {
        rejectUnauthorized: false 
      }
    })
    break;

  default:
    throw new Error(`Unknown environment: ${env}`);
}

export const dataSource = new DataSource(options);
