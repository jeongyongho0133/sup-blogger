'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase/client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Firebase로 로그인합니다.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firebase 사용자로부터 ID 토큰을 가져옵니다.
      const idToken = await user.getIdToken();

      // 3. NextAuth의 `signIn` 함수에 `idToken`을 전달하여 서버 세션을 생성합니다.
      const nextAuthResponse = await signIn('credentials', {
        redirect: false, // 페이지 리디렉션을 막고, 응답 객체를 받습니다.
        idToken, // ID 토큰을 credentials로 전달
      });

      if (nextAuthResponse?.error) {
        // NextAuth 로그인 실패 시 에러를 처리합니다.
        setError('서버 세션 생성에 실패했습니다: ' + nextAuthResponse.error);
        return;
      }

      // 4. 로그인 성공 후 홈페이지로 리디렉션하고, 서버 상태를 새로고침합니다.
      router.push('/');
      router.refresh();

    } catch (err: any) {
      console.error('Error logging in:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>

          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              로그인
            </button>
          </div>

          <div className="text-center mt-4">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signup">
              계정이 없으신가요? 회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
