import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'; // <-- Importando a biblioteca de segurança

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Definimos a força da criptografia (10 é o padrão seguro do mercado)
    const saltRounds = 10;
    
    // 2. Transformamos a senha pura (ex: "senha123") em um hash gigante
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, saltRounds);

    // 3. Salvamos no banco com a senha blindada
    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password_hash: hashedPassword, // <-- Aqui vai a senha criptografada!
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}