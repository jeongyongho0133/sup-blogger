'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 💡 임시 데이터: 전체 매물 목록. 실제로는 DB에서 효율적으로 찜 목록을 가져옵니다.
const allProperties = [
  { id: 'p001', title: '강남구 역삼동 아파트', price: '매매 15억', location: '서울시 강남구', image: '/placeholder-image.svg' },
  { id: 'p002', title: '서초구 반포동 신축 빌라', price: '전세 8억', location: '서울시 서초구', image: '/placeholder-image.svg' },
  { id: 'p003', title: '마포구 서교동 원룸', price: '월세 100/1000', location: '서울시 마포구', image: '/placeholder-image.svg' },
  { id: 'p004', title: '종로구 평창동 단독주택', price: '매매 30억', location: '서울시 종로구', image: '/placeholder-image.svg' },
  { id: 'p005', title: '성동구 성수동 지식산업센터', price: '월세 500/5000', location: '서울시 성동구', image: '/placeholder-image.svg' },
  { id: 'p006', title: '용산구 한남동 고급 아파트', price: '전세 20억', location: '서울시 용산구', image: '/placeholder-image.svg' },
];

// 💡 임시 데이터: 현재 사용자가 찜한 매물의 ID 목록. 실제로는 DB에서 가져옵니다.
const initialWishedIds = ['p002', 'p006'];

export default function MyWishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [wishedIds, setWishedIds] = useState(initialWishedIds);

  // 찜한 ID 목록에 해당하는 매물 정보만 필터링
  const wishedProperties = useMemo(() => {
    return allProperties.filter(p => wishedIds.includes(p.id));
  }, [wishedIds]);

  // 찜 해제 핸들러
  const handleRemoveWish = (id: string) => {
    if (confirm('이 매물을 찜 목록에서 삭제하시겠습니까?')) {
      setWishedIds(currentIds => currentIds.filter(wishId => wishId !== id));
      alert('찜 목록에서 삭제되었습니다.');
    }
  };

  if (status === 'loading') {
    return <p>목록을 불러오는 중입니다...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return <p>로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">찜한 매물</h1>
        <p className="text-gray-500 mt-1">관심있는 매물을 모아보세요.</p>
      </header>

      {wishedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishedProperties.map(property => (
            <div key={property.id} className="border rounded-lg shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{property.title}</h3>
                  <p className="text-indigo-600 font-bold mt-1">{property.price}</p>
                  <p className="text-sm text-gray-500 mt-1 flex-grow">{property.location}</p>
                  <div className="mt-4 flex space-x-2">
                     <Link href={`/property/${property.id}`} className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                        상세보기
                      </Link>
                      <button
                        onClick={() => handleRemoveWish(property.id)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        찜 해제
                      </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">찜한 매물이 없습니다.</h2>
          <p className="text-gray-500 mt-2 mb-6">관심있는 매물을 발견하면 찜해보세요!</p>
          <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg transition-colors">
            매물 보러가기
          </Link>
        </div>
      )}
    </div>
  );
}
