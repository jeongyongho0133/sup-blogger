'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MyPageDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">마이페이지 대시보드</h1>
      <p className="text-gray-600 mb-8">
        {session?.user?.name ? `${session.user.name}님, 환영합니다!` : '환영합니다!'}
        <br />
        여기에서 회원 정보, 등록한 매물, 찜한 매물 등 활동 내역을 관리할 수 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 내 정보 수정 카드 */}
        <Link href="/mypage/profile" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-indigo-600">내 정보 수정</h3>
            <p className="text-sm text-gray-500 mt-2">계정 정보를 확인하고 수정합니다.</p>
        </Link>

        {/* 내가 등록한 매물 카드 */}
        <Link href="/mypage/listings" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-indigo-600">내가 등록한 매물</h3>
            <p className="text-sm text-gray-500 mt-2">직접 등록한 매물을 관리합니다.</p>
        </Link>

        {/* 찜한 매물 카드 */}
        <Link href="/mypage/wishlist" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-indigo-600">찜한 매물</h3>
            <p className="text-sm text-gray-500 mt-2">관심 있는 매물들을 모아봅니다.</p>
        </Link>
      </div>
    </div>
  );
}
