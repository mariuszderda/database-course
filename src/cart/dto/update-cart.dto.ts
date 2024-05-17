import { IsArray } from 'class-validator';
import { ProductInCartType } from '../../../interfaces';

export class UpdateCartDto {
  @IsArray()
  items: ProductInCartType[];
}

// "items": [
//   {
//     "name": "Laptop Lenovo",
//     "reference": "lenovo-thinkbook-16",
//     "price": 3599,
//     "quantity": 1,
//     "_id": "6640ca4fc4bf949a7632315d"
//   }
// ],
//   "totalCost": 3599,
//   "createdAt": "2024-05-12T13:55:18.948Z",
//   "updatedAt": "2024-05-12T13:55:18.948Z",
//   "_id": "6640ca4fc4bf949a7632315c",
//   "__v": 0
