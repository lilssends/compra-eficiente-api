import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.purchase.findMany({
      where: { userId },
      orderBy: { purchaseDate: 'desc' },
      include: {
        market: { select: { id: true, name: true, city: true } },
        items: {
          include: {
            product: { select: { id: true, name: true, barcode: true } },
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const purchase = await this.prisma.purchase.findFirst({
      where: { id, userId },
      include: {
        market: true,
        items: { include: { product: true } },
      },
    });
    if (!purchase) {
      throw new NotFoundException('Compra nao encontrada');
    }
    return purchase;
  }

  async create(userId: string, data: {
    marketId: string;
    purchaseDate: string;
    totalAmount: number;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>;
  }) {
    return this.prisma.purchase.create({
      data: {
        userId,
        marketId: data.marketId,
        purchaseDate: new Date(data.purchaseDate),
        totalAmount: data.totalAmount,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        market: true,
        items: { include: { product: true } },
      },
    });
  }

  async getInflationReport(userId: string) {
    const purchases = await this.prisma.purchase.findMany({
      where: { userId },
      orderBy: { purchaseDate: 'asc' },
      select: { purchaseDate: true, totalAmount: true },
    });

    if (purchases.length < 2) {
      return { message: 'Dados insuficientes', data: purchases };
    }

    const first = purchases[0];
    const last = purchases[purchases.length - 1];
    const inflationRate = ((last.totalAmount - first.totalAmount) / first.totalAmount) * 100;

    return {
      firstPurchaseDate: first.purchaseDate,
      lastPurchaseDate: last.purchaseDate,
      firstAmount: first.totalAmount,
      lastAmount: last.totalAmount,
      inflationRate: Math.round(inflationRate * 100) / 100,
      totalPurchases: purchases.length,
      monthlyData: purchases,
    };
  }
              }
