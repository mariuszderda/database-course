import { HttpException } from '@nestjs/common';
import mongoose from 'mongoose';

export const validId = (id: string) => {
  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) throw new HttpException('Valid id number', 404);
};
