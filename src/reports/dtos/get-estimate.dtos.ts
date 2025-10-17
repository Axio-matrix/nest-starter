import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2026)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsLatitude()
  lat: number;
  
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsLongitude()
  lng: number;
}
