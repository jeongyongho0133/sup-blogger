'use client';

import Link from 'next/link';
import AuthButton from './AuthButton'; // 실제 인증 상태를 관리하는 AuthButton을 가져옵니다.

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* 로고 및 주요 메뉴 */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500">
            부동산 플랫폼
          </Link>
          <Link href="/property/new" className="text-gray-700 font-semibold hover:text-indigo-600">
            매물 등록하기
          </Link>
        </div>

        {/* 우측 메뉴: 실제 인증 상태를 반영하는 AuthButton으로 교체 */}
        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
