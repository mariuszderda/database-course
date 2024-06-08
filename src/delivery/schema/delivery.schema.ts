import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
export enum DeliveryTypeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Schema({ timestamps: true })
export class Delivery {
  @Prop({ required: true })
  delivery_type: string;

  @Prop({ required: true })
  display_name: string;

  @Prop({ required: true })
  delivery_cost: number;

  @Prop({ required: true })
  status: DeliveryTypeStatus;

  @Prop({ default: now(), required: false })
  createdAt?: Date;

  @Prop({ default: now(), required: false })
  updatedAt?: Date;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
