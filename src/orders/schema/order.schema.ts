import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import {
  DeliveryType,
  OrderCustomerType,
  ProductInCartType,
} from '../../../types';

enum OrderStatusEnum {
  created = 'created',
  payment_accepted = 'payment_accepted',
  in_delivered = 'in_delivered',
  delivered = 'delivered',
  canceled = 'canceled',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Object })
  customer: OrderCustomerType;

  @Prop({ required: true, type: Object })
  delivery_address: DeliveryType;

  @Prop({ required: true, type: Array })
  items: ProductInCartType[];

  @Prop({ required: true })
  payment_method: string;

  @Prop({ required: true, type: String })
  status: {
    enum: OrderStatusEnum;
    default: OrderStatusEnum.created;
  };

  @Prop({ required: true })
  amount: number;

  @Prop({ default: now(), required: false })
  createdAt?: Date;

  @Prop({ default: now(), required: false })
  updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
