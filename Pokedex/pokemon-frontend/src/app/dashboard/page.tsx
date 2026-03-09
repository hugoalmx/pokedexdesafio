'use client';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [pokemons, setPokemons] = useState([]);
  const { logout } = useAuth();
  const router = useRouter();

  const fetchPokemons = async () => {
    try {
      const { data } = await api.get('/pokemon');
      setPokemons(data);
    } catch (error) {
      console.error("Erro ao carregar a Pokedex", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Função para deletar no Prisma/Neon
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este Pokémon?')) {
      try {
        await api.delete(`/pokemon/${id}`);
        // Remove da tela imediatamente
        setPokemons(pokemons.filter((p: any) => p.id !== id));
      } catch (error) {
        console.error("Erro ao excluir", error);
        alert("Não foi possível excluir.");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-yellow-400">Pokedex - Treva Lab</h1>
        <div className="flex gap-4">
          <Link href="/dashboard/add" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold">
            + Capturar
          </Link>
          <button onClick={logout} className="bg-red-600 px-4 py-2 rounded font-bold">
            Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pokemons.map((p: any) => (
          <div key={p.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-xl font-bold uppercase text-yellow-500">{p.name}</h2>
            <p className="text-gray-400">Tipo: {Array.isArray(p.type) ? p.type.join(', ') : p.type}</p>
            
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-blue-900 px-2 py-1 rounded">LVL: {p.level}</span>
              <span className="text-xs bg-red-900 px-2 py-1 rounded">HP: {p.hp}</span>
            </div>

            {/* --- OS BOTÕES QUE ESTAVAM FALTANDO --- */}
            <div className="mt-6 flex justify-between border-t border-gray-700 pt-4">
              <button 
                onClick={() => router.push(`/dashboard/edit/${p.id}`)}
                className="text-blue-400 hover:underline text-sm font-bold"
              >
                EDITAR
              </button>
              <button 
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:underline text-sm font-bold"
              >
                EXCLUIR
              </button>
            </div>
            {/* -------------------------------------- */}
          </div>
        ))}
      </div>
    </div>
  );
}