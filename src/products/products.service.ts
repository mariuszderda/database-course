import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }
}
