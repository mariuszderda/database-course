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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @UseGuards(AuthGuardJwt)
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuardJwt)
  findOne(@Param('id') id: string) {
    validId(id);
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    validId(id);
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  remove(@Param('id') id: string) {
    validId(id);
    return this.customersService.remove(id);
  }
}
