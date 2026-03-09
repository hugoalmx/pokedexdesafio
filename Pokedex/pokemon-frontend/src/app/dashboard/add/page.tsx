'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Target, Activity, Hash, Tag } from 'lucide-react';
import api from '@/services/api';

export default function AddPokemonPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState<number | ''>('');
  const [hp, setHp] = useState<number | ''>('');
  const [pokedexNumber, setPokedexNumber] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post('/pokemon', {
        name,
        // Transforma "Fogo, Voador" em ["Fogo", "Voador"]
        type: type.split(',').map(t => t.trim()), 
        level: Number(level),
        hp: Number(hp),
        pokedex_number: Number(pokedexNumber) || 0
      });

      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao capturar Pokémon:", error);
      alert("Falha ao registrar captura. Verifique os dados.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-yellow-500/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative"
      >
        {/* Efeito de brilho de fundo (Glow) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-3xl blur opacity-10"></div>
        
        {/* Container Principal */}
        <div className="relative bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Botão de Voltar */}
          <button 
            onClick={() => router.back()}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Cabeçalho do Formulário */}
          <div className="text-center mb-10 mt-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <Target size={28} className="text-yellow-500" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent uppercase tracking-widest">
              Nova Captura
            </h1>
            <p className="text-sm text-gray-500 mt-2 uppercase tracking-wider">
              Registre um novo aliado na base de dados
            </p>
          </div>

          {/* Formulário */}
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
                  placeholder="Ex: Charizard"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
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
                  placeholder="Ex: 6"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
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
                placeholder="Ex: Fogo, Voador (Separe por vírgulas)"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
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
                  placeholder="1 - 100"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
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
                  placeholder="Ex: 350"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* Botão Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full mt-8 py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Zap size={20} className="animate-bounce" />
                  Sincronizando...
                </>
              ) : (
                <>
                  Registrar no Banco
                </>
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}