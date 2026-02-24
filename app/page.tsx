'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-10 space-y-8 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">부동산 중개 플랫폼</h1>
        <p className="text-lg text-gray-600">
          신뢰할 수 있는 부동산 거래를 위한 최고의 솔루션입니다. 지금 바로 시작하여 완벽한 부동산을 찾아보세요.
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-center pt-4">
          <Link href="/register?type=regular" className="w-full md:w-auto px-6 py-3 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            일반 회원가입
          </Link>
          <Link href="/register?type=owner" className="w-full md:w-auto px-6 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            소유주 회원가입
          </Link>
          <Link href="/register?type=agent" className="w-full md:w-auto px-6 py-3 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            공인중개사 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
