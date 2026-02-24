import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <nav className="flex items-center w-full px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
          부동산 중개 플랫폼
        </Link>

        {/* Spacer div that grows to push buttons to the right */}
        <div className="flex-grow"></div>

        {/* Login/Signup Buttons */}
        <div className="flex items-center">
          <Link href="/login" className="text-gray-800 font-semibold hover:text-blue-500 px-4 py-2">
            로그인
          </Link>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
}
