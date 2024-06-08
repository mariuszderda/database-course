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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validId(id);
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    validId(id);
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  remove(@Param('id') id: string) {
    validId(id);
    return this.paymentsService.remove(id);
  }
}
