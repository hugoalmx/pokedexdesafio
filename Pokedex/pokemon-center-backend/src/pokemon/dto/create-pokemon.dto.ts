import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsInt()
  @Min(1)
  level: number;

  @IsInt()
  @Min(1)
  hp: number;

  @IsInt()
  @Min(1)
  pokedex_number: number;

  @IsOptional() // <-- Mudamos para opcional para o validador não reclamar
  created_by?: string;
}