import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserDocument } from './schema/user.schema';
import { AuthGuardJwt } from './auth-guard.jwt';
import { AuthGuardLocal } from './auth-guard.local';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: UserDocument) {
    return {
      userId: user._id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: UserDocument) {
    const { password, ...data } = user.toObject();
    return data;
  }
}
