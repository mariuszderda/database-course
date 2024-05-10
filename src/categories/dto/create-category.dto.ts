import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(5, 100)
  name: string;

  @IsString()
  @Length(30, 500)
  description: string;
}
