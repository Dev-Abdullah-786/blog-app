import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

// Define a type for the user object attached to req
interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  avatar: string | null;
  accessToken?: string;
  // add any other fields returned by validateGoogleUser/login
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    // Passport will redirect automatically
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @Request() req: { user: AuthenticatedUser },
    @Res() res: Response,
  ) {
    const userData = await this.authService.login(req.user);

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'ok';
  }
}
