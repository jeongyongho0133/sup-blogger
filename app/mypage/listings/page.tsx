'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 임시 데이터
const allProperties = [
  { id: 'p001', title: '강남구 역삼동 아파트', price: '매매 15억', location: '서울시 강남구', image: '/placeholder-image.svg', userEmail: 'testuser@example.com' },
  { id: 'p002', title: '서초구 반포동 신축 빌라', price: '전세 8억', location: '서울시 서초구', image: '/placeholder-image.svg', userEmail: 'anotheruser@example.com' },
  { id: 'p003', title: '마포구 서교동 원룸 (내 매물)', price: '월세 100/1000', location: '서울시 마포구', image: '/placeholder-image.svg', userEmail: 'testuser@example.com' },
  { id: 'p004', title: '종로구 평창동 단독주택', price: '매매 30억', location: '서울시 종로구', image: '/placeholder-image.svg', userEmail: 'anotheruser@example.com' },
  { id: 'p008', title: '강남구 청담동 상가 (내 매물)', price: '월세 1000/1억', location: '서울시 강남구', image: '/placeholder-image.svg', userEmail: 'testuser@example.com' },
];

export default function MyListingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<typeof allProperties>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/mypage/listings');
    } else if (status === 'authenticated') {
      if (session && session.user && session.user.email) {
        const userEmail = session.user.email;
        const userListings = allProperties.filter(p => p.userEmail === userEmail);
        setListings(userListings);
      } else {
        setListings([]);
      }
    }
  }, [status, session, router]);

  const handleDelete = (id: string) => {
    if (confirm('정말로 이 매물을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setListings(currentListings => currentListings.filter(p => p.id !== id));
      alert('매물이 삭제되었습니다.');
    }
  };

  if (status === 'loading') {
    return <p>목록을 불러오는 중입니다...</p>;
  }
  
  if (status === 'unauthenticated') {
      return <p>로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">내가 등록한 매물</h1>
          <p className="text-gray-500 mt-1">총 {listings.length}개의 매물을 등록하셨습니다.</p>
        </div>
        <Link href="/property/new" className="mt-4 sm:mt-0 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          + 새 매물 등록하기
        </Link>
      </header>

      {listings.length > 0 ? (
        <div className="space-y-6">
          {listings.map(listing => (
            <div key={listing.id} className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              {/* 💡 Next.js 13+ Image 최적화: 부모 요소에 relative, w-full, h-full 추가 */}
              <div className="relative w-full sm:w-32 h-32 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill // 💡 fill 속성으로 변경
                  className="object-cover rounded-md" // 💡 object-cover로 스타일링
                />
              </div>
              <div className="flex-grow sm:ml-6 text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                <p className="text-indigo-600">{listing.price}</p>
                <p className="text-sm text-gray-500">{listing.location}</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  수정
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">아직 등록한 매물이 없습니다.</p>
          <Link href="/property/new" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            + 첫 매물 등록하러 가기
          </Link>
        </div>
      )}
    </div>
  );
}
