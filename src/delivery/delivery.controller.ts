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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validId(id);
    return this.deliveryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    validId(id);
    return this.deliveryService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    validId(id);
    return this.deliveryService.remove(id);
  }
}
