import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaymentTypeStatus } from '../../payments/schema/payment.schema';

export class CreateDeliveryDto {
  @MaxLength(30, { message: 'Max length is 30 characters' })
  @IsNotEmpty()
  @IsString({})
  delivery_type: string;

  @MaxLength(120, { message: 'Max length is 120 characters' })
  @IsNotEmpty()
  @IsString()
  display_name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  delivery_cost: number;

  @IsEnum(PaymentTypeStatus)
  @IsNotEmpty()
  status: string;
}
