import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderModel.create(createOrderDto);
      return order.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return this.orderModel.find({});
  }

  async findOne(id: string) {
    return this.orderModel.findOne({ _id: id });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
        new: true,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      this.orderModel.findOneAndDelete({ _id: id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
