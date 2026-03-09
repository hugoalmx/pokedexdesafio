import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { AuthGuard } from '../auth/auth.guard'; // <-- Importe o guarda

@UseGuards(AuthGuard) // 🛡️ A partir de agora, essa rota exige o Token!
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
create(@Body() createPokemonDto: CreatePokemonDto, @Request() req) {
  // Pegamos o ID do usuário que está dentro do Token (req.user.sub)
  const userId = req.user.sub;
  return this.pokemonService.create(createPokemonDto, userId);
}

  @Get()
 findAll(@Request() req) {
    // O AuthGuard já colocou o usuário dentro do 'req.user'
    const userId = req.user.sub; 
    return this.pokemonService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id); // Removido o sinal de + que forçava ser número
  }

 @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updatePokemonDto: UpdatePokemonDto,
    @Request() req // <-- Pegamos o request para ler o Token
  ) {
    const userId = req.user.sub; // ID do dono do Token
    return this.pokemonService.update(id, updatePokemonDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.pokemonService.remove(id, userId); // Removido o sinal de +
  }
}