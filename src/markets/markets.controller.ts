import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MarketsService } from './markets.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Request() req,
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
  ) {
    return this.marketsService.findAll(
      req.user.userId,
      lat ? parseFloat(lat) : undefined,
      lng ? parseFloat(lng) : undefined,
    );
  }

  @Get('search')
  @UseGuards(AuthGuard)
  search(@Query('q') query: string) {
    return this.marketsService.searchByName(query || '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body()
    body: {
      name: string;
      address?: string;
      city?: string;
      state?: string;
      latitude?: number;
      longitude?: number;
    },
  ) {
    return this.marketsService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      address?: string;
      city?: string;
      state?: string;
      latitude?: number;
      longitude?: number;
    },
  ) {
    return this.marketsService.update(id, body);
  }
}
