import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPokemonDto: CreatePokemonDto, userId: any) {
    return await this.prisma.pokemon.create({
      data: {
        name: createPokemonDto.name,
        type: createPokemonDto.type,
        level: createPokemonDto.level,
        hp: createPokemonDto.hp,
        pokedex_number: createPokemonDto.pokedex_number,
        created_by: userId,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.pokemon.findMany( {
      where: {
        created_by: userId,
      },
    });
  }

  // 👇 Novos métodos usando o Prisma e id como string 👇

  async findOne(id: string) {
    return await this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto, userId: string) {
    return await this.prisma.pokemon.updateMany({
      where: {
        id: id,
        created_by: userId, // 🛡️ Só edita se for o dono!
      },
      data: updatePokemonDto,
    });
  }

  async remove(id: string, userId: string) {
    return await this.prisma.pokemon.deleteMany({
      where: { id,
        created_by: userId,
       },
    });
  }
}