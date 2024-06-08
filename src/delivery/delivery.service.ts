import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './schema/delivery.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery>,
  ) {}
  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      const delivery = await this.deliveryModel.create(createDeliveryDto);
      return delivery.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    try {
      return this.deliveryModel.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      return this.deliveryModel.findById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      return this.deliveryModel.findByIdAndUpdate(id, updateDeliveryDto, {
        new: true,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      const { deletedCount } = await this.deliveryModel.deleteOne({ _id: id });
      return deletedCount;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
