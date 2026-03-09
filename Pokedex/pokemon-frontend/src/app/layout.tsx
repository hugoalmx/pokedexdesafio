import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* O AuthProvider PRECISA envolver o children */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}