import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
export enum PaymentTypeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  payment_type: string;

  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  status: PaymentTypeStatus;

  @Prop({ default: now(), required: false })
  createdAt?: Date;

  @Prop({ default: now(), required: false })
  updatedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
