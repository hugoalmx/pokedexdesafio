// Copie e cole a interface aqui
export interface Pokemon {
  id: string;
  name: string;
  type: string[]; // Conforme o DTO que corrigimos
  level: number;
  hp: number;
  pokedex_number: number;
  created_at: string;
  updated_at: string;
  created_by: string; // ID do Treinador (User)
}