import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.product.findMany();
  }
async create(data: any) {
  return this.prisma.product.create({
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock), 
      description: data.description,
      imageUrl: data.imageUrl,
    },
  });
}
}

