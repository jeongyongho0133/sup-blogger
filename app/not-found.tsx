'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다.</h2>
        <p className="text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
        <Link href="/" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
