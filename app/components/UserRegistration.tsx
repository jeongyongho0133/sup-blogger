'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function UserRegistration() {
  // 폼 데이터 상태
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI 상태
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreedToTerms) {
      setError('이용약관 및 개인정보처리방침에 동의해야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/register/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || '회원가입이 성공적으로 완료되었습니다.');
      } else {
        setError(data.message || '가입 처리 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-10">
        <h2 className="text-3xl font-bold text-indigo-600">가입 완료!</h2>
        <p className="mt-4 text-lg text-gray-700">{success}</p>
        <p className="mt-2 text-gray-600">지금 바로 로그인하여 모든 서비스를 이용해보세요.</p>
        <Link href="/login" className="mt-8 inline-block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          로그인 페이지로 이동
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center text-gray-800">일반 회원가입</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">가입 오류</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">이메일 (계정 ID)</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
            <input id="terms-user" name="terms-user" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        </div>
        <div className="ml-3 text-sm">
            <label htmlFor="terms-user" className="font-medium text-gray-700">
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-800" target="_blank">이용약관</Link> 및 <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800" target="_blank">개인정보처리방침</Link>에 동의합니다.
            </label>
        </div>
      </div>
      
      <button type="submit" disabled={!agreedToTerms || isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>처리 중...</span>
          </div>
        ) : (
          '가입하기'
        )}
      </button>
    </form>
  );
}
