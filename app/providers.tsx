'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth'; // Session 타입을 import 합니다.

// Providers 컴포넌트의 props 타입을 정의합니다.
interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null; // session은 Session 타입이거나 null일 수 있습니다.
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    // layout에서 전달받은 session으로 SessionProvider를 초기화합니다.
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
