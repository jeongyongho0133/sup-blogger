import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User as CustomUser } from './index'; // ./index.ts에서 정의한 우리 앱의 User 타입을 가져옵니다.

declare module "next-auth" {
  /**
   * Session 객체를 확장합니다.
   * user 객체에 우리 앱의 커스텀 User 타입을 적용합니다.
   */
  interface Session {
    user: {
      id: string;
      role: 'user' | 'agent' | 'admin';
    } & DefaultSession["user"];
  }

  /**
   * User 모델을 확장합니다. (Adapter 사용 시)
   */
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  /**
   * JWT 토큰을 확장합니다.
   * 토큰에 id와 role을 포함시킵니다.
   */
  interface JWT {
    id: string;
    role: 'user' | 'agent' | 'admin';
  }
}
