'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Plus, LogOut, Search, Edit2, Trash2, Activity } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Pokemon } from '@/types/pokemon';

export default function DashboardPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Pokemon | null>(null); // Controla o modal de exclusão
  const [isLoading, setIsLoading] = useState(true);
  
  const { logout } = useAuth();
  const router = useRouter();

  // Busca os dados da API mantendo a sua lógica original
  const fetchPokemons = async () => {
    try {
      const { data } = await api.get('/pokemon');
      setPokemons(data);
    } catch (error) {
      console.error("Erro ao carregar a Pokedex", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Lógica de exclusão conectada ao novo Modal
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/pokemon/${deleteTarget.id}`);
      setPokemons(pokemons.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Erro ao excluir", error);
      alert("Não foi possível excluir.");
    }
  };

  // Filtro de busca em tempo real
  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (Array.isArray(p.type) ? p.type.join(' ') : p.type).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500/30">
      {/* --- HEADER PREMIUM --- */}
      <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Treva Lab */}
          <div className="flex items-center gap-3">
            <Zap size={28} className="text-yellow-500" />
            <h1 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent uppercase tracking-widest">
              Pokédex
            </h1>
            <span className="text-xs text-gray-500 uppercase tracking-widest hidden sm:inline border-l border-gray-700 pl-3">
              Treva Lab
            </span>
          </div>

          {/* Controles: Busca e Botões */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard/add')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Capturar</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="p-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
              title="Sair"
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Zap size={40} className="text-yellow-500 animate-pulse" />
          </div>
        ) : filteredPokemons.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-gray-500 text-lg uppercase tracking-widest">Nenhum Pokémon encontrado na sua base de dados.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPokemons.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#121212] border border-white/10 hover:border-yellow-500/50 rounded-2xl p-6 relative group transition-colors shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                      {p.name}
                    </h2>
                    <span className="text-xs font-mono text-gray-500">#{p.pokedex_number || '000'}</span>
                  </div>

                  {/* Badges de Tipo */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(p.type) ? p.type.map((t, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                        {t}
                      </span>
                    )) : (
                      <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                        {p.type}
                      </span>
                    )}
                  </div>

                  {/* Status do Pokémon */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400 flex items-center gap-1"><Activity size={14}/> Level</span>
                      <span className="font-bold text-yellow-500">{p.level}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">HP</span>
                        <span className="font-mono text-gray-300">{p.hp} / {p.hp}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex justify-end gap-2 border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => router.push(`/dashboard/edit/${p.id}`)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => setDeleteTarget(p)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* --- MODAL DE EXCLUSÃO (FRAMER MOTION) --- */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Libertar Pokémon?</h3>
              <p className="text-gray-400 text-sm mb-8">
                Tem certeza que deseja libertar <strong className="text-white uppercase">{deleteTarget.name}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}