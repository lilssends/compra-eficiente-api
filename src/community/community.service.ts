import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  // LGPD: community_prices NEVER stores name, email, CPF, phone
  // shareAnonymously must be opt-in by user
  async getPrices(productId?: string, marketId?: string, city?: string) {
    return this.prisma.communityPrice.findMany({
      where: {
        ...(productId && { productId }),
        ...(marketId && { marketId }),
        ...(city && { market: { city: { contains: city, mode: 'insensitive' } } }),
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        product: { select: { id: true, name: true, barcode: true } },
        market: { select: { id: true, name: true, city: true, state: true } },
      },
      // LGPD: no user data returned - userId is never included in response
    });
  }

  async reportPrice(
    userId: string,
    shareAnonymously: boolean,
    data: {
      productId: string;
      marketId: string;
      price: number;
    },
  ) {
    // LGPD: Only share if user explicitly opted in
    if (!shareAnonymously) {
      throw new ForbiddenException(
        'Compartilhamento anonimo deve ser habilitado para contribuir com precos',
      );
    }

    // LGPD: Check if user has enabled anonymous sharing in settings
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { shareAnonymously: true },
    });

    if (!user || !user.shareAnonymously) {
      throw new ForbiddenException(
        'Ative o compartilhamento anonimo nas configuracoes para contribuir',
      );
    }

    // LGPD: Store price WITHOUT any personal data
    return this.prisma.communityPrice.create({
      data: {
        productId: data.productId,
        marketId: data.marketId,
        price: data.price,
        // NO userId, NO name, NO email stored - full anonymity
      },
      include: {
        product: { select: { id: true, name: true } },
        market: { select: { id: true, name: true, city: true } },
      },
    });
  }

  async getPriceHistory(productId: string, marketId?: string) {
    return this.prisma.communityPrice.findMany({
      where: {
        productId,
        ...(marketId && { marketId }),
      },
      orderBy: { createdAt: 'asc' },
      select: {
        price: true,
        createdAt: true,
        market: { select: { id: true, name: true, city: true } },
        product: { select: { id: true, name: true } },
      },
    });
  }

  async getAveragePrices(productId: string) {
    const prices = await this.prisma.communityPrice.findMany({
      where: { productId },
      include: {
        market: { select: { id: true, name: true, city: true, state: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (prices.length === 0) {
      return { productId, averagePrice: null, prices: [] };
    }

    const totalPrice = prices.reduce((sum, p) => sum + p.price, 0);
    const averagePrice = totalPrice / prices.length;

    return {
      productId,
      averagePrice: Math.round(averagePrice * 100) / 100,
      lowestPrice: Math.min(...prices.map((p) => p.price)),
      highestPrice: Math.max(...prices.map((p) => p.price)),
      totalReports: prices.length,
      prices,
    };
  }
}
