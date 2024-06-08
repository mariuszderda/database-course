import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { DeliveryType } from '../../../types';

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop()
  telephone?: string;

  @Prop({ type: Object })
  delivery?: DeliveryType;

  @Prop({ default: now(), required: false })
  createdAt?: Date;

  @Prop({ default: now(), required: false })
  updatedAt?: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
