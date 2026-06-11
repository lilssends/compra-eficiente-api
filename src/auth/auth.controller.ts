import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with Firebase token' })
  async login(@Body() body: { firebaseUid: string; email: string; name?: string; avatarUrl?: string }) {
    return this.authService.loginWithFirebase(body.firebaseUid, body.email, body.name, body.avatarUrl);
  }
}
