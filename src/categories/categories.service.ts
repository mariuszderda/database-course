import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatorField } from '../../interfaces';
import { Category } from '../../schemas/category.schema';
import { validId } from '../../utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  async create(user: CreatorField, createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    const { _id, username, email } = user;
    newCategory.createdBy = { _id, username, email };
    return newCategory.save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    validId(id);

    const category = await this.categoryModel.findOne({ _id: id });
    if (!category)
      throw new BadRequestException('Category not found', {
        cause: new Error(),
        description: 'Category not found.',
      });

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    validId(id);

    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      updateCategoryDto,
      { new: true },
    );
    if (!category)
      throw new BadRequestException('Category not found', {
        cause: new Error(),
        description: 'Category not found.',
      });
    return category;
  }

  async remove(id: string): Promise<CreateCategoryDto> {
    validId(id);

    return this.categoryModel.findOneAndDelete({
      _id: id,
    });
  }
}
