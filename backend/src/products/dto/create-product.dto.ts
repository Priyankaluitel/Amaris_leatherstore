import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
