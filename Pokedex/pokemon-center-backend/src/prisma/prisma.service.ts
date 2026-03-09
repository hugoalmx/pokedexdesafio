import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'; // Garante que a URL seja carregada a tempo

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Criamos a conexão nativa com o banco
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL as string 
    });
    
    // 2. Criamos o adaptador do Prisma
    const adapter = new PrismaPg(pool);
    
    // 3. Passamos o adaptador para a classe mãe inicializar
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}