import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../customers/schema/customer.schema';
import { Order } from '../orders/schema/order.schema';
import { Product } from '../products/schema/product.schema';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll() {
    const [products, totalAmount, orderCount, lastOrders, totalCustomers] =
      await Promise.all([
        this.productModel.countDocuments(),
        this.orderModel.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' },
            },
          },
          { $unset: ['_id'] },
        ]),
        this.orderModel.countDocuments(),
        this.orderModel
          .find(
            {},
            {
              customer: { first_name: 1, last_name: 1, email: 1 },
              amount: 1,
            },
          )
          .sort({ createdAt: -1 })
          .limit(5),
        this.customerModel.countDocuments(),
      ]);
    return {
      productsCount: products,
      totalAmount,
      orderCount,
      lastOrders,
      totalCustomers,
    };
  }
}
