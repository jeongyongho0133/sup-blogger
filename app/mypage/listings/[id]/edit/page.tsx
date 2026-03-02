'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import RestrictedPage from '../../../../components/RestrictedPage';

// 💡 임시 데이터. 원래는 별도의 데이터 파일이나 API를 통해 가져와야 합니다.
const myMockListings = [
  { id: 'p001', title: '강남역 도보 5분, 풀옵션 오피스텔 월세', price: '2000 / 120' },
  { id: 'p002', title: '홍대입구역 신축빌라 전세, 첫 입주', price: '35000' },
  { id: 'p003', title: '판교 테크노밸리 인근 아파트 매매', price: '120000' },
  { id: 'p004', title: '잠실 롯데타워 뷰, 럭셔리 레지던스', price: '10000 / 500' },
];

// 매물 수정 폼 컴포넌트
const PropertyEditForm = () => {
  const router = useRouter();
  const params = useParams(); // URL의 동적 파라미터(e.g., [id])를 가져옵니다.
  const { id } = params;

  // 폼 필드를 위한 상태 (useState)
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [notFound, setNotFound] = useState(false);

  // 컴포넌트가 마운트될 때 URL의 id를 사용해 기존 매물 데이터를 불러옵니다.
  useEffect(() => {
    const listingToEdit = myMockListings.find(listing => listing.id === id);
    if (listingToEdit) {
      setTitle(listingToEdit.title);
      setPrice(listingToEdit.price);
    } else {
      // 해당 ID의 매물이 없으면 '찾을 수 없음' 상태로 설정
      setNotFound(true);
    }
  }, [id]);

  // 폼 제출 이벤트 핸들러
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 💡 여기에 실제 서버로 수정된 데이터를 전송하는 API 호출 로직이 들어갑니다. (PUT 또는 PATCH 메서드 사용)
    alert('매물 정보가 성공적으로 수정되었습니다.');
    router.push('/mypage/listings'); // 수정 완료 후 목록 페이지로 이동
  };

  // 매물을 찾지 못했을 때 보여줄 화면
  if (notFound) {
    return <div className="text-center p-8">매물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center text-gray-800">매물 정보 수정</h1>
      <p className="text-center text-gray-600 mt-2">매물 ID: {id}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">가격 (만원)</label>
          <input id="price" type="text" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          수정 완료하기
        </button>
      </form>
    </div>
  );
}

export default function EditListingPage() {
  return (
    <main>
      <RestrictedPage>
        <PropertyEditForm />
      </RestrictedPage>
    </main>
  );
}
