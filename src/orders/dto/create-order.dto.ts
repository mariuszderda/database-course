import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import {
  DeliveryType,
  OrderCustomerType,
  ProductInCartType,
} from '../../../types';

export class CreateOrderDto {
  @IsObject()
  customer: OrderCustomerType;

  @IsObject()
  @IsOptional()
  delivery_address: DeliveryType;

  @IsArray()
  items: ProductInCartType[];

  @IsString()
  payment_method: string;

  @IsString()
  delivery_method: string;
}
