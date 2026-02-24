'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OwnerRegistration from '@/app/components/OwnerRegistration';
import AgentRegistration from '@/app/components/AgentRegistration';
import RegularUserRegistration from '@/app/components/RegularUserRegistration';

function RegisterContent() {
  const [userType, setUserType] = useState<'owner' | 'agent' | 'regular' | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'owner' || type === 'agent' || type === 'regular') {
      setUserType(type);
    } else {
      setUserType(null);
    }
  }, [searchParams]);

  const handleUserTypeSelection = (type: 'owner' | 'agent' | 'regular') => {
    router.push(`/register?type=${type}`);
  };

  const handleGoBack = () => {
    router.push('/register');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">회원가입</h1>

        {!userType ? (
          <div className="flex flex-col space-y-4">
            <p className="text-center text-gray-600">
              가입 유형을 선택해주세요.
            </p>
            <div className="grid grid-cols-1 gap-4">
               <button
                onClick={() => handleUserTypeSelection('regular')}
                className="w-full px-4 py-3 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                일반 회원
              </button>
              <button
                onClick={() => handleUserTypeSelection('owner')}
                className="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                소유주 회원
              </button>
              <button
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full px-4 py-3 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                공인중개사 회원
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleGoBack}
              className="mb-4 text-sm font-medium text-blue-500 hover:underline"
            >
              &larr; 다른 유형으로 가입하기
            </button>
            {userType === 'regular' && <RegularUserRegistration />}
            {userType === 'owner' && <OwnerRegistration />}
            {userType === 'agent' && <AgentRegistration />}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}> 
            <RegisterContent />
        </Suspense>
    )
}
