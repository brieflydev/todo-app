import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

class RegisterDto {
  email: string;
  password: string;
  name?: string;
}

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
