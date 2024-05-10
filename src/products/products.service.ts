import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatorField } from '../../interfaces';
import { Product } from '../../schemas/product.schema';
import { UserDocument } from '../../schemas/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(
    user: UserDocument,
    createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    console.log(createProductDto);
    const newProduct = new this.productModel(createProductDto);

    const { _id, username, email } = user;
    newProduct.createdBy = { _id, username, email };

    await newProduct.save();

    return newProduct;
  }

  async findAll() {
    return this.productModel.find();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id);

    if (!product) throw new HttpException(`Product (id: ${id}) not found`, 404);

    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    const product = await this.productModel.findById(id);

    if (!product) throw new HttpException(`Product (id: ${id}) not found`, 404);

    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
