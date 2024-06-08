import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now } from 'mongoose';
import { CartType } from '../../../types';

export type CartDocument = Cart & mongoose.Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    required: true,
    type: [
      {
        name: String,
        reference: String,
        price: Number,
        quantity: Number,
      },
    ],
  })
  items: CartType[];

  @Prop({ required: true })
  totalCost: number;

  @Prop({ required: false })
  orderId?: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
