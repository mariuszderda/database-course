import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './schema/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.paymentModel.create(createPaymentDto);
      return payment.save();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  async findAll() {
    try {
      return this.paymentModel.find();
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  findOne(id: string) {
    try {
      return this.paymentModel.findOne({ _id: id });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      return this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, {
        new: true,
      });
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  async remove(id: string) {
    try {
      return this.paymentModel.deleteOne({ _id: id }, {});
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }
}
