import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, unique: true })
  reference: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, index: true })
  description: string;

  @Prop({ required: false })
  category?: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: now(), required: false })
  createdAt?: Date;

  @Prop({ default: now(), required: false })
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
