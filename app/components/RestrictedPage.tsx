'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

// 이 컴포넌트는 페이지 접근 권한을 제어합니다.
// 실제 앱에서는 쿠키나 세션, 상태 관리 라이브러리를 통해 로그인 여부를 확인합니다.
const isLoggedIn = true; // <-- 🚨 임시로 '로그인 안 됨' 상태를 시뮬레이션합니다.

interface RestrictedPageProps {
  children: ReactNode;
  allowedRoles?: string[]; // (선택) 특정 역할(예: 'owner')만 접근 가능하도록 설정
}

export default function RestrictedPage({ children }: RestrictedPageProps) {
  if (isLoggedIn) {
    // 로그인 된 사용자: 실제 페이지 컨텐츠를 보여줍니다.
    return <>{children}</>;
  } else {
    // 로그인 안 된 사용자: 회원가입 유도 화면을 보여줍니다.
    return (
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-10">
        <h2 className="text-3xl font-bold text-red-500">로그인이 필요합니다</h2>
        <p className="mt-4 text-lg text-gray-700">
          이 페이지는 로그인한 회원만 이용할 수 있는 서비스입니다.
        </p>
        <p className="mt-2 text-gray-600">
          매물을 등록하거나 관리하고 싶으신가요? 먼저 로그인 또는 회원가입을 진행해주세요.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login" className="w-full sm:w-auto inline-block py-3 px-8 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            로그인
          </Link>
          <Link href="/signup" className="w-full sm:w-auto inline-block py-3 px-8 border border-indigo-600 rounded-md shadow-sm text-lg font-medium text-indigo-600 bg-white hover:bg-indigo-50">
            회원가입
          </Link>
        </div>
      </div>
    );
  }
}
