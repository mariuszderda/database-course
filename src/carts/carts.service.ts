import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartType, ProductInCartType, ProductType } from '../../types';
import { Cart, CartDocument } from './schema/cart.schema';
import { Product } from '../products/schema/product.schema';
import { validId } from '../../utils';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    validId(createCartDto._id);

    const product = await this.productModel.findOne({
      _id: createCartDto._id,
    });

    const { name, reference, price } = product;

    const newCart = await this.cartModel.create({
      totalCost: createCartDto.quantity * price,
      items: [
        {
          name,
          reference,
          price,
          quantity: createCartDto.quantity,
        },
      ],
    });

    return newCart.save();
  }

  async findAll() {
    return this.cartModel.find();
  }

  async findOne(id: string) {
    validId(id);

    const cart = await this.cartModel.findOne({ _id: id });

    if (!cart) throw new BadRequestException('Cart not found');
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    console.time('UPDATE');
    validId(id);

    for (const cartProd of updateCartDto.items) {
      validId(cartProd._id.toString());
    }

    const currentCart: CartType = await this.cartModel.findOne({ _id: id });

    const cartProductsIds = updateCartDto.items.map((item) => item._id);

    const cartProducts: ProductType[] = await this.productModel.find({
      _id: { $in: cartProductsIds },
    });

    const newItems: ProductInCartType[] = cartProducts.map((item) => {
      const { quantity } = updateCartDto.items.find(
        (cartItem) => cartItem._id.toString() === item._id.toString(),
      );
      return {
        _id: item._id,
        name: item.name,
        reference: item.reference,
        price: item.price,
        quantity,
      };
    });

    const allItems = [...currentCart.items, ...newItems];
    const totalCost = allItems.reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0);
    // const totalCost = allItems.reduce(() => {}, 0);
    console.timeEnd('UPDATE');
    return this.cartModel.findOneAndUpdate(
      { _id: id },
      { items: allItems, totalCost },
      { new: true },
    );
  }
}
