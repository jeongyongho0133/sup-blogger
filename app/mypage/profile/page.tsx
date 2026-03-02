'use client';

import { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 💡 실제 앱에서는 로그인하지 않은 사용자는 next-auth 미들웨어를 통해
// 이 페이지 접근이 자동으로 차단되지만, 클라이언트에서도 한번 더 확인합니다.

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 폼 필드 상태 (세션에서 사용자 정보를 가져와 초기값으로 설정)
  const [name, setName] = useState(session?.user?.name ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // 에러 및 성공 메시지 상태
  const [message, setMessage] = useState({ type: '', text: '' });

  // 로딩 상태 처리
  if (status === 'loading') {
    return <p>정보를 불러오는 중입니다...</p>;
  }

  // 비로그인 사용자 처리
  if (status === 'unauthenticated') {
    // 로그인 페이지로 리디렉션하거나 접근 제한 메시지를 보여줄 수 있습니다.
    // 여기서는 간단하게 메시지를 표시합니다.
    router.push('/login');
    return <p>로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage({ type: '', text: '' });

    // 비밀번호 변경 시, 새 비밀번호와 확인이 일치하는지 검사
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }

    // 💡 여기에 실제 서버로 사용자 정보를 업데이트하는 API 호출 로직이 들어갑니다.
    // 이 예제에서는 콘솔에 로그를 남기고 성공 메시지를 표시합니다.
    console.log('수정된 정보:', { name, newPassword });
    setMessage({ type: 'success', text: '회원 정보가 성공적으로 수정되었습니다.' });

    // 성공 후 잠시 뒤 마이페이지 대시보드로 이동 (선택적)
    setTimeout(() => {
      router.push('/mypage');
    }, 2000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">내 정보 수정</h1>
        <p className="text-gray-500 mt-1">개인 정보를 최신 상태로 유지하세요.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 (수정 불가) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            id="email"
            value={session?.user?.email ?? ''}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>

        {/* 이름 수정 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* 비밀번호 변경 */}
        <div className="border-t pt-6 space-y-6">
            <h2 className="text-lg font-semibold">비밀번호 변경</h2>
            <div>
                <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
                >
                현재 비밀번호
                </label>
                <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
                >
                새 비밀번호
                </label>
                <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
                >
                새 비밀번호 확인
                </label>
                <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
        </div>

        {/* 메시지 표시 */}
        {message.text && (
          <div className={`p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {/* 저장 버튼 */}
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
