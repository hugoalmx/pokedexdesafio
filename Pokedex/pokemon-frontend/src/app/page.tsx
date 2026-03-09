'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Assim que a página carregar, joga o treinador para o login
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="animate-pulse text-yellow-500 font-bold uppercase tracking-widest">
        Redirecionando para Pokemon Lab...
      </div>
    </div>
  );
}