import { Category } from './category.model'; // make sure this enum is defined

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;         // match your backend field
  description?: string;
  category: Category;
}
