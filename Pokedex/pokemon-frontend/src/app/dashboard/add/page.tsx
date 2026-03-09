'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function AddPokemonPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(10);
  const [pokedexNumber, setPokedexNumber] = useState(1);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // O backend espera esses nomes de campos exatos
      await api.post('/pokemon', {
        name,
        type: [type],
        level: Number(level),
        hp: Number(hp),
        pokedex_number: Number(pokedexNumber)
      });

      alert('Pokémon capturado! 🔴');
      router.push('/dashboard'); 
    } catch (error) {
      console.error("Erro ao adicionar:", error);
      alert("Erro 500? Verifique se o backend está recebendo o userId do token.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-500">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">Registrar Pokémon</h1>
        
        <div className="space-y-4">
          <input type="text" placeholder="Nome do Pokémon" required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:border-blue-400" />
          
          <input type="text" placeholder="Tipo (ex: Fogo)" required value={type} onChange={(e) => setType(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none" />

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Level" value={level} onChange={(e) => setLevel(Number(e.target.value))}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg" />
            <input type="number" placeholder="HP" value={hp} onChange={(e) => setHp(Number(e.target.value))}
              className="p-3 bg-gray-700 border border-gray-600 rounded-lg" />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all shadow-lg">
            SALVAR NO SISTEMA
          </button>
        </div>
      </form>
    </div>
  );
}