import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { AuthGuardJwt } from '../auth/auth-guard.jwt';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  //. create product route
  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuardJwt)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const isIdValid = mongoose.isValidObjectId(id);
    if (!isIdValid) throw new HttpException('Invalid product ID.', 404);

    return this.productService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuardJwt)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const isIdValid = mongoose.isValidObjectId(id);
    if (!isIdValid) throw new HttpException('Invalid product ID.', 404);

    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  deleteProduct(@Param('id') id: string) {
    const isIdValid = mongoose.isValidObjectId(id);
    if (!isIdValid) throw new HttpException('Invalid product ID.', 404);

    return this.productService.deleteProduct(id);
  }
}
