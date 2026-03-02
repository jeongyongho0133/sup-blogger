'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'next-auth/react'; // firebase/auth 대신 next-auth/react에서 signOut을 가져옵니다.
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // next-auth의 signOut 함수를 사용하도록 수정합니다.
  // 이 함수는 서버 세션과 클라이언트 세션을 모두 올바르게 종료합니다.
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // 로그아웃 후 홈페이지로 리디렉션합니다.
  };

  if (loading) {
    return <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>;
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-sm text-gray-600">안녕하세요, {user.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm">
              로그인
            </span>
          </Link>
          <Link href="/register">
            <span className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">
              회원가입
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
