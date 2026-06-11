import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async loginWithFirebase(firebaseUid: string, email: string, name?: string, avatarUrl?: string) {
    let user = await this.prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) {
      user = await this.prisma.user.create({ data: { firebaseUid, email, name, avatarUrl } });
    }
    const secret = this.config.get<string>('JWT_SECRET');
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '7d';
    const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn } as any);
    return { token, user };
  }
}
