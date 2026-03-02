'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createProperty, State } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
    >
      {pending ? '등록 중...' : '매물 등록하기'}
    </button>
  );
}

const AMENITIES_LIST = [
  '주차가능', '엘리베이터', '에어컨', '세탁기', '냉장고', 'TV', '인터넷', '가스레인지', '인덕션', '붙박이장', '신발장'
];

// 파일(이미지)을 Base64로 변환하는 헬퍼 함수
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function NewPropertyPage() {
  const initialState: State = { message: null, errors: {} };
  const [formState, dispatch] = useFormState(createProperty, initialState);
  const state = formState || initialState;

  const [transactionType, setTransactionType] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [generationError, setGenerationError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(e.target.files);
      const newPreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    } else {
      setImageFiles(null);
      setImagePreviews([]);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleGenerateBlog = async () => {
    setIsGenerating(true);
    setGenerationError('');
    setBlogTitle('');
    setBlogContent('');

    const formElement = document.querySelector('form');
    if (!formElement) return;

    const formData = new FormData(formElement);
    const formValues = Object.fromEntries(formData.entries());

    // 이미지 파일들을 Base64로 변환
    let imageBase64Strings: string[] = [];
    if (imageFiles) {
        imageBase64Strings = await Promise.all(Array.from(imageFiles).map(file => fileToBase64(file)));
    }

    const propertyData = {
      address: formValues.address,
      propertyType: formValues.propertyType,
      transactionType: formValues.transactionType,
      price: formValues.price ? parseInt(formValues.price as string) * 10000 : (formValues.deposit ? parseInt(formValues.deposit as string) * 10000 : undefined),
      monthlyRent: formValues.rent ? parseInt(formValues.rent as string) * 10000 : undefined,
      area: {
        supply: formValues.supplyArea,
        exclusive: formValues.area,
      },
      floor: {
        current: formValues.floor,
        total: formValues.totalFloor,
      },
      rooms: formValues.bedrooms,
      bathrooms: formValues.bathrooms,
      parking: formData.getAll('amenities').includes('주차가능'),
      moveInDate: '협의',
      description: formValues.description,
      images: imageBase64Strings // Base64로 인코딩된 이미지 배열 추가
    };

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
         const errorText = await response.text();
        throw new Error(`서버 오류: ${errorText}`);
      }

      const result = await response.json();
      setBlogTitle(result.blogTitle);
      setBlogContent(result.blogContent);

    } catch (error: any) {
      setGenerationError(error.message || '블로그 생성 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-lg my-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">새 매물 등록</h1>

      {state.message && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">등록 오류</p>
          <p>{state.message}</p>
        </div>
      )}
      
      <form action={dispatch} className="space-y-8">
        {/* ... ommited for brevity ... */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">제목</label>
          <input id="title" name="title" type="text" required className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="예: 강남역 도보 5분, 풀옵션 신축 오피스텔" />
          {state.errors?.title && <p className="text-sm text-red-500 mt-1">{state.errors.title.join(', ')}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyType" className="block text-lg font-medium text-gray-700">매물 종류</label>
            <select id="propertyType" name="propertyType" required className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">종류를 선택하세요</option>
              <option value="아파트">아파트</option>
              <option value="빌라">빌라</option>
              <option value="단독주택">단독주택</option>
              <option value="오피스텔">오피스텔</option>
              <option value="상가/사무실">상가/사무실</option>
            </select>
            {state.errors?.propertyType && <p className="text-sm text-red-500 mt-1">{state.errors.propertyType.join(', ')}</p>}
          </div>
          <div>
            <label htmlFor="transactionType" className="block text-lg font-medium text-gray-700">거래 종류</label>
            <select id="transactionType" name="transactionType" required value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">거래를 선택하세요</option>
              <option value="매매">매매</option>
              <option value="임대">임대 (전세/월세)</option>
            </select>
             {state.errors?.transactionType && <p className="text-sm text-red-500 mt-1">{state.errors.transactionType.join(', ')}</p>}
          </div>
        </div>

        {transactionType === '매매' && (
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">매매가 (만원)</label>
            <input id="price" name="price" type="number" placeholder="예: 150000" required className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {state.errors?.price && <p className="text-sm text-red-500 mt-1">{state.errors.price.join(', ')}</p>}
          </div>
        )}
        {transactionType === '임대' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deposit" className="block text-lg font-medium text-gray-700">보증금 (만원)</label>
              <input id="deposit" name="deposit" type="number" placeholder="예: 5000" required className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {state.errors?.deposit && <p className="text-sm text-red-500 mt-1">{state.errors.deposit.join(', ')}</p>}
            </div>
            <div>
              <label htmlFor="rent" className="block text-lg font-medium text-gray-700">월세 (만원)</label>
              <input id="rent" name="rent" type="number" placeholder="0 (전세인 경우)" required className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              {state.errors?.rent && <p className="text-sm text-red-500 mt-1">{state.errors.rent.join(', ')}</p>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="supplyArea" className="block text-lg font-medium text-gray-700">공급 면적(㎡)</label>
            <input id="supplyArea" name="supplyArea" type="number" step="0.01" placeholder="예: 110.5" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="area" className="block text-lg font-medium text-gray-700">전용 면적(㎡)</label>
            <input id="area" name="area" type="number" step="0.01" required placeholder="예: 84.9" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            {state.errors?.area && <p className="text-sm text-red-500 mt-1">{state.errors.area.join(', ')}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label htmlFor="floor" className="block text-lg font-medium text-gray-700">해당 층</label>
            <input id="floor" name="floor" type="number" placeholder="예: 15" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="totalFloor" className="block text-lg font-medium text-gray-700">총 층수</label>
            <input id="totalFloor" name="totalFloor" type="number" placeholder="예: 25" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-lg font-medium text-gray-700">침실 수</label>
            <input id="bedrooms" name="bedrooms" type="number" required placeholder="예: 3" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            {state.errors?.bedrooms && <p className="text-sm text-red-500 mt-1">{state.errors.bedrooms.join(', ')}</p>}
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-lg font-medium text-gray-700">욕실 수</label>
            <input id="bathrooms" name="bathrooms" type="number" required placeholder="예: 2" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            {state.errors?.bathrooms && <p className="text-sm text-red-500 mt-1">{state.errors.bathrooms.join(', ')}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-lg font-medium text-gray-700">주소</label>
          <input id="address" name="address" type="text" required placeholder="상세 주소까지 정확하게 입력해주세요" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          {state.errors?.address && <p className="text-sm text-red-500 mt-1">{state.errors.address.join(', ')}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">상세 설명</label>
          <textarea id="description" name="description" required rows={8} placeholder="매물의 특징, 교통, 주변 환경 등에 대해 자세하게 설명해주세요." className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          {state.errors?.description && <p className="text-sm text-red-500 mt-1">{state.errors.description.join(', ')}</p>}
        </div>
        
        <div>
          <label className="block text-lg font-medium text-gray-700">편의시설 (선택 가능)</label>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {AMENITIES_LIST.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <input type="checkbox" name="amenities" value={amenity} className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"/>
                <span className="text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block text-lg font-medium text-gray-700">매물 사진 (최소 1장 이상)</label>
          <input id="images" name="images" type="file" required multiple accept="image/*" onChange={handleImageChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"/>
          {state.errors?.images && <p className="text-sm text-red-500 mt-1">{state.errors.images.join(', ')}</p>}
        </div>

        {imagePreviews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">미리보기</h3>
            <div className="flex flex-wrap gap-4 p-2 border rounded-md bg-gray-50">
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  style={{ width: '96px', height: '96px', overflow: 'hidden' }}
                  className="rounded-md shadow-sm"
                >
                  <img
                    src={src}
                    alt={`미리보기 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <SubmitButton />
            <button
              type="button"
              onClick={handleGenerateBlog}
              disabled={isGenerating}
              className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              {isGenerating ? '블로그 생성 중...' : '블로그 자동 생성'}
            </button>
        </div>
      </form>

      {(isGenerating || generationError || blogContent) && (
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">블로그 미리보기</h2>
          {isGenerating && <p className="text-center text-gray-500">콘텐츠를 생성하고 있습니다...</p>}
          {generationError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">오류: </strong>
              <span className="block sm:inline">{generationError}</span>
            </div>
          )}
          {blogContent && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">생성된 제목</label>
                <input type="text" readOnly value={blogTitle} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">생성된 본문 (Markdown)</label>
                <textarea readOnly value={blogContent} rows={20} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm font-mono"></textarea>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
