import { SchemaFactory } from '@nestjs/mongoose';

export class Order {}

export const OrderSchema = SchemaFactory.createForClass(Order);
