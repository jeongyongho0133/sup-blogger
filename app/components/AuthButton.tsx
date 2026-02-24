'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase/client';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Logout successful, redirect to the homepage
      router.push('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
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
