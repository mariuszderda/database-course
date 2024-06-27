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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserDocument } from '../auth/schema/user.schema';
import { AuthGuardJwt } from '../auth/auth-guard.jwt';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards(AuthGuardJwt)
  create(
    @CurrentUser() user: UserDocument,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(user, createProductDto);
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
