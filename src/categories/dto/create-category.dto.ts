import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(10, 500, { message: 'Description must be between 10 and 500 sign.' })
  description: string;
}
