
import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

// 런타임 시점에 환경 변수가 없는 경우, 에러를 발생시켜 서버가 시작되지 않도록 합니다.
if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error('AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET must be set in .env.local');
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      // 타입스크립트에게 이 값들이 undefined가 아님을 명시적으로 알려줍니다. (!)
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
};
