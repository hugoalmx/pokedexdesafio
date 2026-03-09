import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Token não encontrado! Você precisa estar logado.');
    }
    
    try {
      // Verifica se o token é válido usando a nossa chave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'CHAVE_SUPER_SECRETA_DO_HUGUIN',
      });
      // Anexa os dados do usuário (ID e Email) na requisição para usarmos depois
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}