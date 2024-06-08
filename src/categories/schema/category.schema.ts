import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { CreatorField } from '../../../types';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: false,
    type: {
      _id: { required: true, type: String },
      username: { required: true, type: String },
      email: { required: true, type: String },
    },
  })
  createdBy?: CreatorField;

  @Prop({ default: now(), required: true })
  createdAt: Date;

  @Prop({ default: now(), required: true })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
