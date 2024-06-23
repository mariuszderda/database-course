import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validId } from '../../utils';
import { AuthGuardJwt } from '../auth/auth-guard.jwt';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuardJwt)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuardJwt)
  findOne(@Param('id') id: string) {
    validId(id);
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    validId(id);
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  remove(@Param('id') id: string) {
    validId(id);
    return this.orderService.remove(id);
  }
}
