import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  // Usamos um objeto simples para garantir que o Nest capture o Body
  signIn(@Body() body: any) {
    return this.authService.signIn(body.email, body.password);
  }
}