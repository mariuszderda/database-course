import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PaymentTypeStatus } from '../schema/payment.schema';

export class CreatePaymentDto {
  @MaxLength(30, { message: 'Max length is 30 characters' })
  @IsNotEmpty()
  @IsString({})
  payment_type: string;

  @MaxLength(120, { message: 'Max length is 120 characters' })
  @IsNotEmpty()
  @IsString()
  display_name: string;

  @IsEnum(PaymentTypeStatus)
  @IsNotEmpty()
  status: string;
}
