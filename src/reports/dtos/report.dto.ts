import { Expose, Transform } from "class-transformer";
import { User } from "src/users/users.entity";
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
    year: number

    @Transform( ({ obj }) => obj.users.id)
    @Expose()
    userId: number
}