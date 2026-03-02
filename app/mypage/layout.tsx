import Link from 'next/link';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    // 전체 페이지 레이아웃과 통일성을 주기 위해 일부 클래스 조정
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-xl max-w-6xl mx-auto flex flex-col sm:flex-row">
      {/* 사이드바 */}
      <aside className="w-full sm:w-1/4 pr-0 sm:pr-8 mb-8 sm:mb-0">
        <div className="bg-gray-50 rounded-lg p-4 sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">마이페이지</h2>
          <nav className="flex flex-col space-y-2">
            <Link href="/mypage/profile" className="px-4 py-2 text-gray-700 rounded-md hover:bg-indigo-100 hover:text-indigo-600 font-medium">
              내 정보 수정
            </Link>
            <Link href="/mypage/listings" className="px-4 py-2 text-gray-700 rounded-md hover:bg-indigo-100 hover:text-indigo-600 font-medium">
              내가 등록한 매물
            </Link>
            <Link href="/mypage/wishlist" className="px-4 py-2 text-gray-700 rounded-md hover:bg-indigo-100 hover:text-indigo-600 font-medium">
              찜한 매물
            </Link>
          </nav>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="w-full sm:w-3/4">
        {children}
      </main>
    </div>
  );
}
