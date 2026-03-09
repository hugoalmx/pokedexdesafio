import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <-- Importando o módulo do Prisma aqui

@Module({
  imports: [PrismaModule], // <-- Avisando ao NestJS que o Pokémon pode usar o Prisma
  controllers: [PokemonController],
  providers: [PokemonService],
  
})
export class PokemonModule {}