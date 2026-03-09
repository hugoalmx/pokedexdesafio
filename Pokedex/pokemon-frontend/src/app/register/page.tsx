'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, ArrowLeft, Zap } from 'lucide-react';
import api from '@/services/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/users', {
        email,
        password_hash: password
      });

      alert('Treinador cadastrado com sucesso! Redirecionando para o login...');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Ocorreu um erro ao criar sua conta. Verifique os dados.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white p-4 selection:bg-yellow-500/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative"
      >
        {/* Glow Effect mais sutil para a página secundária */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-900 to-gray-800 rounded-2xl blur opacity-30"></div>
        
        <form onSubmit={handleRegister} className="relative bg-[#121212] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl rounded-2xl space-y-6">
          
          {/* Botão de Voltar */}
          <button 
            type="button"
            onClick={() => router.back()} 
            className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Header do Registro */}
          <div className="text-center mb-8 mt-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <UserPlus size={28} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">
              Novo Treinador
            </h2>
            <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase">Base de Dados Central</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} className="text-gray-500"/> E-mail
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} className="text-gray-500"/> Nova Senha
              </label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono"
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-4 mt-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest border border-white/10 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <Zap size={20} className="animate-pulse text-yellow-500" />
            ) : (
              'Criar Conta'
            )}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}