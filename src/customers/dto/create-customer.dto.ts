import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DeliveryType } from '../../../types';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(50)
  first_name: string;

  @IsString()
  @MaxLength(50)
  last_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  telephone?: string;

  @IsOptional()
  @IsObject()
  delivery?: DeliveryType;
}
