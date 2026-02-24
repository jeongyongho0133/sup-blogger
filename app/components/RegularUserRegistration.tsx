'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useAuth } from '@/context/AuthContext';

export default function RegularUserRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setError('이용약관 및 개인정보처리방침에 동의해야 합니다.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home page after successful sign-up
    } catch (err: any) {
      console.error('Error signing up:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else if (err.code === 'auth/weak-password') {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-6">
        {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700" htmlFor="email">
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
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700" htmlFor="password">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700" htmlFor="confirm-password">
              비밀번호 확인
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
        </div>
         <div className="space-y-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              <a href="/terms/service" target="_blank" className="text-blue-500 hover:underline">이용약관</a>에 동의합니다.
            </label>
        </div>
        <div className="space-y-2">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="privacy" className="text-sm">
              <a href="/terms/privacy" target="_blank" className="text-blue-500 hover:underline">개인정보처리방침</a>에 동의합니다.
            </label>
        </div>
        <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        >
            회원가입
        </button>
    </form>
  );
}
