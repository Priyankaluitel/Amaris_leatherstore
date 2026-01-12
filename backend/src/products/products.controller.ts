
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto} from './dto/update-product.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Category } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  getAll(@Query('category') category?: string) {
    const catEnum = category ? (Category[category.toUpperCase() as keyof typeof Category] as Category) : undefined;
    return this.products.findAll(catEnum);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.products.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.products.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.products.remove(+id);
  }
}
