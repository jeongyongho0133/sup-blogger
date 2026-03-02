import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';

// 💡 v4의 getServerSession을 사용하여 세션 정보를 가져옵니다.
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Real Estate Platform',
  description: 'A comprehensive real estate platform for buying, selling, and renting properties.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 💡 v4의 getServerSession을 사용하여 세션 정보를 가져옵니다.
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Providers로 감싸서 클라이언트 컴포넌트들에 세션 정보를 제공합니다. */}
        <Providers session={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
