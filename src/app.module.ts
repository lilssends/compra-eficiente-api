import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MarketsModule } from './markets/markets.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CommunityModule } from './community/community.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    MarketsModule,
    PurchasesModule,
    CommunityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
