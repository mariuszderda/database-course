import { IsArray } from 'class-validator';

export class CreateCartDto {
  @IsArray()
  _id: string;
  quantity: number;
}
