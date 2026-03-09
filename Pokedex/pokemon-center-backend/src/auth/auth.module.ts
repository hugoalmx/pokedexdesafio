import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'CHAVE_SUPER_SECRETA_DO_HUGUIN', // Em um projeto real, isso ficaria escondido no arquivo .env
      signOptions: { expiresIn: '1h' }, // A pulseira VIP expira em 1 hora
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}