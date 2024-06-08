import { IsArray } from 'class-validator';
import { ProductInCartType } from '../../../types';

export class UpdateCartDto {
  @IsArray()
  items: ProductInCartType[];
}
