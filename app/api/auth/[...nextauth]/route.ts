import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth.js의 API 핸들러를 생성합니다.
// 이 핸들러는 로그인, 로그아웃, 세션 관리 등 인증과 관련된 모든 서버 요청을 처리합니다.
const handler = NextAuth(authOptions);

// GET과 POST 요청에 대해 동일한 핸들러를 내보냅니다.
export { handler as GET, handler as POST };
