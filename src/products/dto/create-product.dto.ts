import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(3, 50)
  reference: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
