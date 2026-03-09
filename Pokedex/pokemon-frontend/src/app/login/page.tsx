'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      alert('Erro ao acessar o Centro Pokémon. Verifique suas credenciais.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white p-4 selection:bg-yellow-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-2xl blur opacity-20"></div>
        
        <form onSubmit={handleSubmit} className="relative bg-[#121212] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl rounded-2xl space-y-6">
          
          {/* Header do Login */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <Zap size={28} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent uppercase tracking-widest">
              Acesso Restrito
            </h2>
            <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase">Treva Lab • Centro Pokémon</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} className="text-yellow-500"/> Email do Treinador
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="treinador@trevalab.com"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-700 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} className="text-yellow-500"/> Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white placeholder-gray-700 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all disabled:opacity-50 flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? (
              <Zap size={20} className="animate-pulse" />
            ) : (
              <>
                <LogIn size={18} /> Entrar no Sistema
              </>
            )}
          </motion.button>

          {/* Link para Register */}
          <p className="mt-8 text-center text-gray-500 text-xs uppercase tracking-wider">
            Ainda não é um mestre?{' '}
            <Link href="/register" className="text-yellow-500 font-bold hover:text-yellow-400 hover:underline transition-colors ml-1">
              Recrute-se
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}