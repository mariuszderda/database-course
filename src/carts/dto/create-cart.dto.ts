import { IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  _id: string;
  @IsNumber()
  quantity: number;
}
