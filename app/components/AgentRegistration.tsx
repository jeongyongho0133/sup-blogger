'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function AgentRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agentLicenseNumber, setAgentLicenseNumber] = useState('');
  const [brokerageRegistrationNumber, setBrokerageRegistrationNumber] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreedToTerms) {
      setError('이용약관 및 개인정보처리방침에 동의해야 합니다.');
      return;
    }

    const response = await fetch('/api/register/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        email, 
        phoneNumber, 
        password, 
        agentLicenseNumber, 
        brokerageRegistrationNumber, 
        businessRegistrationNumber 
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(data.message);
    } else {
      setError(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">공인중개사 회원 가입</h2>
      
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">이름 (실명)</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
        <input 
          type="text" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">이메일</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">비밀번호</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">중개사 자격번호</label>
        <input 
          type="text" 
          value={agentLicenseNumber}
          onChange={(e) => setAgentLicenseNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">중개업소 등록번호</label>
        <input 
          type="text" 
          value={brokerageRegistrationNumber}
          onChange={(e) => setBrokerageRegistrationNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">사업자 등록번호</label>
        <input 
          type="text" 
          value={businessRegistrationNumber}
          onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
          required 
        />
      </div>

      <div className="flex items-center">
        <input
          id="terms-agent"
          name="terms-agent"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="terms-agent" className="ml-2 block text-sm text-gray-900">
          <Link href="/terms/agent-service" className="underline" target="_blank">이용약관</Link> 및 <Link href="/terms/agent-privacy" className="underline" target="_blank">개인정보처리방침</Link>에 동의합니다.
        </label>
      </div>
      
      <button 
        type="submit" 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        disabled={!agreedToTerms}
      >
        가입 신청하기
      </button>
    </form>
  );
}
