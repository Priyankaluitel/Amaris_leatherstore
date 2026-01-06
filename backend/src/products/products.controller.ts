import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  // ✅ PUBLIC: get all products (optional category filter)
 @Get()
getAll(@Query('category') category?: string) {
  return this.products.findAll(category); // ✅ category argument now accepted
}


  // ✅ PUBLIC: product detail
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.products.findOne(+id);
  }

  // 🔐 ADMIN: create product
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  // 🔐 ADMIN: update product
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.products.update(+id, dto);
  }

  // 🔐 ADMIN: delete product
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.products.remove(+id);
  }
}

