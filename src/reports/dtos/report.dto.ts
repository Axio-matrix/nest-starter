import { Expose, Transform } from 'class-transformer';

export class reportDto {
  @Expose()
  price: number;

  @Expose()
  mileage: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  year: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
