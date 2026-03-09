'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/services/api';

export default function EditPokemonPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState(0);
  const [hp, setHp] = useState(0);
  const [pokedexNumber, setPokedexNumber] = useState(0);
  
  const router = useRouter();
  const { id } = useParams(); // Pega o ID do Pokémon da URL

  // 1. Busca os dados atuais do Pokémon ao carregar a página
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const { data } = await api.get(`/pokemon/${id}`);
        setName(data.name);
        setType(Array.isArray(data.type) ? data.type.join(', ') : data.type);
        setLevel(data.level);
        setHp(data.hp);
        setPokedexNumber(data.pokedex_number);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
        alert("Pokémon não encontrado!");
        router.push('/dashboard');
      }
    };
    loadPokemon();
  }, [id, router]);

  // 2. Envia as atualizações para o Backend (NestJS)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/pokemon/${id}`, {
        name,
        type: type.split(',').map(t => t.trim()), // Garante que vire Array se o seu DTO pedir
        level: Number(level),
        hp: Number(hp),
        pokedex_number: Number(pokedexNumber)
      });

      alert('Dados atualizados com sucesso! ✨');
      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl border border-yellow-500 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center uppercase tracking-tighter">Editar Treinamento</h1>
        
        <div className="space-y-4">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded border border-gray-600 outline-none focus:border-yellow-500" />
          
          <input type="text" placeholder="Tipo (ex: Fogo, Voador)" value={type} onChange={(e) => setType(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded border border-gray-600 outline-none" />

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Level" value={level} onChange={(e) => setLevel(Number(e.target.value))}
              className="p-3 bg-gray-700 rounded border border-gray-600" />
            <input type="number" placeholder="HP" value={hp} onChange={(e) => setHp(Number(e.target.value))}
              className="p-3 bg-gray-700 rounded border border-gray-600" />
          </div>

          <div className="flex gap-4 mt-6">
            <button type="button" onClick={() => router.back()} className="w-1/2 py-3 bg-gray-600 hover:bg-gray-500 rounded font-bold">CANCELAR</button>
            <button type="submit" className="w-1/2 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded font-bold">SALVAR</button>
          </div>
        </div>
      </form>
    </div>
  );
}