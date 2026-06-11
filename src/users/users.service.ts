import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, data: { name?: string; avatarUrl?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getSettings(userId: string) {
    const settings = await this.prisma.userSettings.findUnique({
      where: { userId },
    });
    if (!settings) throw new NotFoundException('Settings not found');
    return settings;
  }

  async updateSettings(userId: string, data: {
    shareAnonymously?: boolean;
    shareCity?: boolean;
    shareState?: boolean;
    notifications?: boolean;
    currency?: string;
    language?: string;
  }) {
    return this.prisma.userSettings.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }

  async deleteAccount(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted successfully' };
  }
}
