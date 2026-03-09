'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
// Adicione o import do Link
import Link from 'next/link';

// ... abaixo do seu </form>:


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      alert('Erro ao acessar o Centro Pokémon. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">Centro Pokémon - Login</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email do Treinador</label>
          <input
            type="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Entrar no Sistema
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
  Ainda não é um mestre?{' '}
  <Link href="/register" className="text-blue-500 font-bold hover:underline">
    Crie sua conta aqui!
  </Link>
</p>
      </form>
    </div>
  );
}