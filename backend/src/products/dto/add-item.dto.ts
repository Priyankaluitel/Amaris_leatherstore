import { Category } from '@prisma/client';

export class CreateProductDto {
  name!: string;
  price!: number;
  stock!: number;
  category!: Category;
}
