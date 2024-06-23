import mongoose from 'mongoose';
export type CreatorField = {
  _id: mongoose.ObjectId;
  username: string;
  email: string;
};

export type ProductType = {
  _id: mongoose.ObjectId;
  name: string;
  reference: string;
  price: number;
  stock: number;
  description: string;
  category?: string;
  createdBy: CreatorField;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductInCartType = {
  _id: mongoose.ObjectId;
  name?: string;
  reference?: string;
  price?: number;
  quantity: number;
};

export type CartType = {
  _id: mongoose.ObjectId;
  totalCost: number;
  items: ProductInCartType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type DeliveryType = {
  street_and_number: string;
  city: string;
  zip_code: string;
};

export type OrderCustomerType = {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
};
