import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    return this.purchasesService.findAll(req.user.userId);
  }

  @Get('inflation')
  @UseGuards(AuthGuard)
  getInflationReport(@Request() req) {
    return this.purchasesService.getInflationReport(req.user.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.purchasesService.findOne(id, req.user.userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Request() req,
    @Body()
    body: {
      marketId: string;
      purchaseDate: string;
      totalAmount: number;
      items: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
      }>;
    },
  ) {
    return this.purchasesService.create(req.user.userId, body);
  }
}
