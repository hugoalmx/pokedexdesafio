'use client'; // Necessário para usar hooks como useState

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api'; // Certifique-se que o caminho da sua api está correto

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Fazemos o POST para a rota /users que testamos no Thunder Client
      await api.post('/users', {
        email,
        password_hash: password // Enviamos a senha como password_hash para o backend aceitar
      });

      alert('Treinador cadastrado com sucesso! Redirecionando para o login...');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Ocorreu um erro ao criar sua conta.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Novo Treinador</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="No mínimo 6 caracteres"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Criar Conta
          </button>
          <button 
  onClick={() => router.back()} 
  className="mb-4 text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition"
>
  ← Voltar para o login
</button>
        </form>
      </div>
      
    </div>
  );
}