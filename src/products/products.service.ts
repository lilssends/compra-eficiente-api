import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructo

    async findByBarcode(barcode: string) {
        const product = await this.prisma.product.findUnique({
              where: { barcode },
                    include: { images: true },
                        });
                            if (!product) throw new NotFoundException('Product not found');
                                return product;
                                  }

                                    async search(query: string, category?: string) {
                                        return this.prisma.product.findMany({
                                              where: {
                                                      AND: [
                                                                { name: { contains: query, mode: 'insensitive' } },
                                                                          category ? { category } : {},
                                                                                  ],
                                                                                        },
                                                                                              include: { images: true },
                                                                                                    take: 20,
                                                                                                        });
                                                                                                          }
                                                                                                          
                                                                                                            async create(data: any) {
                                                                                                                return this.prisma.product.create({ data });
                                                                                                                  }
                                                                                                                  
                                                                                                                    async findById(id: string) {
                                                                                                                        const product = await this.prisma.product.findUnique({
                                                                                                                              where: { id },
                                                                                                                                    include: { images: true },
                                                                                                                                        });
                                                                                                                                            if (!product) throw new NotFoundException('Product not found');
                                                                                                                                                return product;
                                                                                                                                                  }
                                                                                                                                                  
                                                                                                                                                    async update(id: string, data: any) {
                                                                                                                                                        return this.prisma.product.update({ where: { id }, data });
                                                                                                                                                          }
                                                                                                                                                          
                                                                                                                                                            async getPriceHistory(productId: string, limit = 30) {
                                                                                                                                                                return this.prisma.communityPrice.findMany({
                                                                                                                                                                      where: { productId },
                                                                                                                                                                            include: { market: true },
                                                                                                                                                                                  orderBy: { reportedAt: 'desc' },
                                                                                                                                                                                        take: limit,
                                                                                                                                                                                            });
                                                                                                                                                                                              }
                                                                                                                                                                                              }
