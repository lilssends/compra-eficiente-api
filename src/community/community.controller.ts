import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get('prices')
  @UseGuards(AuthGuard)
  getPrices(
    @Query('productId') productId?: string,
    @Query('marketId') marketId?: string,
    @Query('city') city?: string,
  ) {
    return this.communityService.getPrices(productId, marketId, city);
  }

  @Get('prices/:productId/average')
  @UseGuards(AuthGuard)
  getAveragePrices(@Param('productId') productId: string) {
    return this.communityService.getAveragePrices(productId);
  }

  @Get('prices/:productId/history')
  @UseGuards(AuthGuard)
  getPriceHistory(
    @Param('productId') productId: string,
    @Query('marketId') marketId?: string,
  ) {
    return this.communityService.getPriceHistory(productId, marketId);
  }

  @Post('prices')
  @UseGuards(AuthGuard)
  reportPrice(
    @Request() req,
    @Body()
    body: {
      productId: string;
      marketId: string;
      price: number;
      shareAnonymously: boolean;
    },
  ) {
    return this.communityService.reportPrice(
      req.user.userId,
      body.shareAnonymously,
      {
        productId: body.productId,
        marketId: body.marketId,
        price: body.price,
      },
    );
  }
}
