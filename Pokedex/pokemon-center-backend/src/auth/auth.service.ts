import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    // 1. Busca o treinador no banco de dados pelo e-mail
    const user = await this.usersService.findByEmail(email);
    
    // 2. Se não achar o usuário, ou se a senha não bater com o hash, bloqueia a entrada!
    console.log('Usuário encontrado:', user);
    console.log('Senha digitada:', pass);
    if 
    (!user || !(await bcrypt.compare(pass, user.password_hash))) {
      throw new UnauthorizedException('E-mail ou senha incorretos. Acesso negado!');
    }

    // 3. Se a senha está certa, preparamos os dados do Token (Payload)
    const payload = { sub: user.id, email: user.email };
    
    // 4. Devolvemos o Token JWT prontinho
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}