import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 소개 */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold">Project RE</h3>
            <p className="mt-4 text-sm text-gray-400">
              신뢰할 수 있는 부동산 거래의 시작. Project RE가 함께합니다.
            </p>
          </div>

          {/* 주요 링크 */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">주요 메뉴</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/property/new" className="text-gray-400 hover:text-white">매물 등록하기</Link></li>
              <li><Link href="/mypage" className="text-gray-400 hover:text-white">마이페이지</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-white">관리자</Link></li>
            </ul>
          </div>

          {/* 정책 링크 */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">약관 및 정책</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/terms/service" className="text-gray-400 hover:text-white">이용약관</Link></li>
              <li><Link href="/terms/privacy" className="text-gray-400 hover:text-white">개인정보처리방침</Link></li>
              <li><Link href="/terms/paid" className="text-gray-400 hover:text-white">유료 서비스 약관</Link></li>
              <li><Link href="/terms/scam" className="text-gray-400 hover:text-white">사기 매물 정책</Link></li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase">소셜</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">블로그</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">페이스북</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">인스타그램</a></li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Project RE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
