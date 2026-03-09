'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Activity, Hash, Tag, Edit2 } from 'lucide-react';
import api from '@/services/api';

export default function EditPokemonPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState<number | ''>('');
  const [hp, setHp] = useState<number | ''>('');
  const [pokedexNumber, setPokedexNumber] = useState<number | ''>('');
  
  // Controles de carregamento da interface
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const router = useRouter();
  const { id } = useParams();

  // 1. Busca os dados atuais do Pokémon ao carregar a página
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const { data } = await api.get(`/pokemon/${id}`);
        setName(data.name);
        setType(Array.isArray(data.type) ? data.type.join(', ') : data.type);
        setLevel(data.level);
        setHp(data.hp);
        setPokedexNumber(data.pokedex_number || '');
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
        alert("Pokémon não encontrado na base de dados!");
        router.push('/dashboard');
      } finally {
        setIsFetching(false);
      }
    };
    loadPokemon();
  }, [id, router]);

  // 2. Envia as atualizações para o Backend (NestJS)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await api.patch(`/pokemon/${id}`, {
        name,
        type: type.split(',').map(t => t.trim()), // Garante o formato Array
        level: Number(level),
        hp: Number(hp),
        pokedex_number: Number(pokedexNumber) || 0
      });

      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar alterações no banco.");
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-yellow-500/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-3xl blur opacity-10"></div>
        
        <div className="relative bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl min-h-[500px] flex flex-col justify-center">
          
          <button 
            onClick={() => router.back()}
            disabled={isSaving}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>

          {isFetching ? (
            // Esqueleto de Carregamento enquanto busca os dados
            <div className="flex flex-col items-center justify-center space-y-4">
              <Zap size={40} className="text-yellow-500 animate-pulse" />
              <p className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                Sincronizando dados...
              </p>
            </div>
          ) : (
            // Formulário de Edição
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-10 mt-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <Edit2 size={28} className="text-blue-500" />
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase tracking-widest">
                  Editar Aliado
                </h1>
                <p className="text-sm text-gray-500 mt-2 uppercase tracking-wider">
                  Ajuste os atributos de combate
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Linha 1: Nome e Número */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Zap size={14} className="text-yellow-500"/> Nome do Pokémon
                    </label>
                    <input 
                      required
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Hash size={14} className="text-gray-500"/> Pokedex N.
                    </label>
                    <input 
                      type="number" 
                      value={pokedexNumber} 
                      onChange={(e) => setPokedexNumber(Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Linha 2: Tipo */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Tag size={14} className="text-blue-400"/> Tipos
                  </label>
                  <input 
                    required
                    type="text" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                  />
                </div>

                {/* Linha 3: Level e HP */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Activity size={14} className="text-green-400"/> Level
                    </label>
                    <input 
                      required
                      type="number" 
                      value={level} 
                      onChange={(e) => setLevel(Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Activity size={14} className="text-red-400"/> HP Máximo
                    </label>
                    <input 
                      required
                      type="number" 
                      value={hp} 
                      onChange={(e) => setHp(Number(e.target.value))}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
                  <button 
                    type="button" 
                    onClick={() => router.back()} 
                    disabled={isSaving}
                    className="flex-1 py-4 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isSaving ? (
                      <Zap size={20} className="animate-pulse" />
                    ) : (
                      'Atualizar'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}