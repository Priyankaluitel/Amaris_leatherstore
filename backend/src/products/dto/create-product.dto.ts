import { Category } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Category)
  category!: Category;
}
