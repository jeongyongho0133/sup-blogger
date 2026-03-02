'use client'; // 에러 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 리포팅 서비스에 에러를 기록할 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20 px-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-red-600 mb-4">문제가 발생했습니다!</h2>
      <p className="text-gray-700 mb-6">
        예상치 못한 오류가 발생하여 페이지를 표시할 수 없습니다. 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={
          // 세그먼트를 다시 렌더링하여 복구를 시도합니다.
          () => reset()
        }
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
