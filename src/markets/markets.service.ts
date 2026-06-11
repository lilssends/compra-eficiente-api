import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, lat?: number, lng?: number) {
    const markets = await this.prisma.market.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { prices: true },
        },
      },
    });
    return markets;
  }

  async findOne(id: string) {
    const market = await this.prisma.market.findUnique({
      where: { id },
      include: {
        prices: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: { product: true },
        },
      },
    });
    if (!market) {
      throw new NotFoundException('Mercado não encontrado');
    }
    return market;
  }

  async create(data: {
    name: string;
    address: string;
    city: string;
    state: string;
    lat?: number;
    lng?: number;
  }) {
    return this.prisma.market.create({ data });
  }

  async update(id: string, data: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    lat?: number;
    lng?: number;
  }) {
    const market = await this.prisma.market.findUnique({ where: { id } });
    if (!market) {
      throw new NotFoundException('Mercado não encontrado');
    }
    return this.prisma.market.update({ where: { id }, data });
  }

  async searchByName(query: string) {
    return this.prisma.market.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { name: 'asc' },
      take: 20,
    });
  }
}
