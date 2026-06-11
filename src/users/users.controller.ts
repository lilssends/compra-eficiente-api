import {
  Controller,
      Get,
      Put,
      Delete,
      Body,
      Req,
      UseGuards,
      HttpCode,
      HttpStatus,
    } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
  import { AuthGuard } from '../auth/auth.guard';

@ApiTags('users')
  @ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
}

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  updateProfile(@Req() req: any, @Body() body: { name?: string; avatarUrl?: string }) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get('settings')
      @ApiOperation({ summary: 'Get user privacy settings' })
      getSettings(@Req() req: any) {
        return this.usersService.getSettings(req.user.id);
       }

  @Put('settings')
  @ApiOperation({ summary: 'Update user privacy settings (LGPD)' })
      updateSettings(@Req() req: any, @Body() body: any) {
        return this.usersService.updateSettings(req.user.id, body);
}

  @Delete('account')
  @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Delete account (LGPD right to erasure)' })
      deleteAccount(@Req() req: any) {
        return this.usersService.deleteAccount(req.user.id);
}
}
