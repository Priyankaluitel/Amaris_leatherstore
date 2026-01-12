import { Category } from '@prisma/client';
import { IsEnum, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(Category)
  category: Category;  // ✅ matches Prisma enum
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsEnum(Category)
  category?: Category;  // ✅ matches Prisma enum
}
