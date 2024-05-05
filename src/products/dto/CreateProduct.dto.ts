import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(50)
  reference: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
  @IsNumber()
  quantity: number;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @MaxLength(50)
  createdBy: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
