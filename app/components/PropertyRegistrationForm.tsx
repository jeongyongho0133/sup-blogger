'use client';

import { useState, FormEvent } from 'react';

export default function PropertyRegistrationForm() {
  const [formData, setFormData] = useState({
    // 1. 접수 정보
    registrationDate: '',
    registrant: '중개사', // 중개사, 소유주, 임차인
    propertyType: '아파트', // 아파트/빌라/오피스텔/주택/상가/토지
    transactionType: '매매', // 매매/전세/월세/교환

    // 2. 위치 및 건물 정보
    address: '',
    buildingName: '',
    floor: '',
    totalFloors: '',
    direction: '',
    supplyArea: '', // 공급면적
    exclusiveArea: '', // 전용면적
    roomCount: '',
    bathroomCount: '',
    completionDate: '',
    totalParking: '',
    parkingPerHousehold: '',
    hasElevator: '유', // 유/무
    landInfoDetails: '', // 토지/건물 상세 정보

    // 3. 가격 정보
    salePrice: '',
    deposit: '',
    rent: '',
    managementFee: '',
    managementFeeIncludes: '',
    loanAmount: '',

    // 4. 입주 및 옵션
    moveInDate: '즉시', // 즉시 또는 협의
    options: '',
    heatingSystem: '', // 도시가스/개별난방 등

    // 5. 상세 특징 및 비고
    summary: '',
    pets: '불가능', // 가능/불가능
    smoking: '불가능', // 가능/불가능
    notes: '',

    // 6. 소유자/임대인 정보
    ownerName: '',
    ownerContact: '',
    
    // 7. 미디어 정보
    youtubeUrl: '',
    homepageUrl: '',

    // 8. 매물 상태 관리
    propertyStatus: '공개', // 공개, 미공개, 보류
  });

  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 10) {
        setError('사진은 최대 10개까지 첨부할 수 있습니다.');
        setPropertyImages([]);
      } else {
        setPropertyImages(files);
        setError(null); 
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (propertyImages.length === 0) {
        setError('매물 사진을 1개 이상 등록해주세요.');
        return;
    }

    // Basic validation
    if (!formData.address || !formData.salePrice && !formData.deposit) {
        setError('필수 정보를 입력해주세요: 주소, 가격 정보');
        return;
    }
    console.log('Form Data Submitted:', { ...formData, propertyImages });
    // API call would go here
    setSuccess('매물 정보가 성공적으로 등록되었습니다.');
    // Reset form or redirect user
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800">매물 등록</h1>

      {/* 1. 접수 정보 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">1. 접수 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">접수일자</label>
            <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">접수자</label>
            <select name="registrant" value={formData.registrant} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>중개사</option>
              <option>소유주</option>
              <option>임차인</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">매물 유형</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>아파트</option>
              <option>빌라</option>
              <option>오피스텔</option>
              <option>주택</option>
              <option>상가</option>
              <option>토지</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">거래 형태</label>
            <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>매매</option>
              <option>전세</option>
              <option>월세</option>
              <option>교환</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* 2. 위치 및 건물 정보 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">2. 위치 및 건물 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">주소 <span className="text-red-500">*</span></label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="지번 또는 도로명 주소 + 동·호수 필수" required/>
            </div>
            <div>
                <label className="block text-sm font-medium">건물명</label>
                <input type="text" name="buildingName" value={formData.buildingName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </div>
            <div className="flex items-end gap-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium">층수</label>
                    <input type="text" name="floor" value={formData.floor} onChange={handleChange} placeholder="해당층" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                <span>/</span>
                <div className="flex-1">
                    <label className="block text-sm font-medium invisible">총층</label>
                    <input type="text" name="totalFloors" value={formData.totalFloors} onChange={handleChange} placeholder="총층" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">방향 (거실 기준)</label>
                <input type="text" name="direction" value={formData.direction} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="예: 남향"/>
            </div>
            <div className="flex items-end gap-2">
                 <div className="flex-1">
                    <label className="block text-sm font-medium">공급면적</label>
                    <input type="text" name="supplyArea" value={formData.supplyArea} onChange={handleChange} placeholder="평 또는 m²" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                 <div className="flex-1">
                    <label className="block text-sm font-medium">전용면적</label>
                    <input type="text" name="exclusiveArea" value={formData.exclusiveArea} onChange={handleChange} placeholder="평 또는 m²" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
            </div>
             <div className="flex items-end gap-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium">방 개수</label>
                    <input type="number" name="roomCount" value={formData.roomCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                 <span>/</span>
                <div className="flex-1">
                    <label className="block text-sm font-medium">욕실 개수</label>
                    <input type="number" name="bathroomCount" value={formData.bathroomCount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">준공일자</label>
                <input type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </div>
             <div className="flex items-end gap-2">
                 <div className="flex-1">
                    <label className="block text-sm font-medium">총 주차대수</label>
                    <input type="text" name="totalParking" value={formData.totalParking} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
                 <span>/</span>
                <div className="flex-1">
                    <label className="block text-sm font-medium">세대당 주차</label>
                    <input type="text" name="parkingPerHousehold" value={formData.parkingPerHousehold} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium">엘리베이터</label>
              <select name="hasElevator" value={formData.hasElevator} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>유</option>
                <option>무</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">토지/건물 상세 정보</label>
              <textarea name="landInfoDetails" value={formData.landInfoDetails} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="여러 필지의 지번, 기타 토지 또는 건물에 대한 상세 내용을 입력하세요. 예: 123-4번지, 123-5번지 (두 필지 동시 매매)"></textarea>
            </div>
        </div>
      </fieldset>

      {/* 3. 가격 정보 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">3. 가격 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
                <label className="block text-sm font-medium">매매가</label>
                <input type="text" name="salePrice" value={formData.salePrice} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="단위: 만원"/>
            </div>
            <div>
                <label className="block text-sm font-medium">보증금</label>
                <input type="text" name="deposit" value={formData.deposit} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="단위: 만원"/>
            </div>
            <div>
                <label className="block text-sm font-medium">월세</label>
                <input type="text" name="rent" value={formData.rent} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="단위: 만원"/>
            </div>
            <div>
                <label className="block text-sm font-medium">관리비</label>
                <input type="text" name="managementFee" value={formData.managementFee} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="단위: 만원"/>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">관리비 포함 내역</label>
                <input type="text" name="managementFeeIncludes" value={formData.managementFeeIncludes} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="예: 인터넷, 수도, 청소비 등"/>
            </div>
             <div>
                <label className="block text-sm font-medium">융자금 (대출 금액)</label>
                <input type="text" name="loanAmount" value={formData.loanAmount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="단위: 만원"/>
            </div>
        </div>
      </fieldset>
      
      {/* 4. 입주 및 옵션 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">4. 입주 및 옵션</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
                <label className="block text-sm font-medium">입주 가능일</label>
                <input type="text" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="즉시 또는 협의 (예: 2024-08-01 이후)"/>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">옵션 사항</label>
                <input type="text" name="options" value={formData.options} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="예: 에어컨, 세탁기, 냉장고, 붙박이장 등"/>
            </div>
            <div>
                <label className="block text-sm font-medium">난방 방식/연료</label>
                <input type="text" name="heatingSystem" value={formData.heatingSystem} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="예: 도시가스/개별난방"/>
            </div>
        </div>
      </fieldset>
      
      {/* 5. 상세 특징 및 비고 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">5. 상세 특징 및 비고</legend>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">특징 요약 (복수 선택 가능)</label>
                 <input type="text" name="summary" value={formData.summary} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="예: 올리모델링, 채광 좋음, 역세권, 뷰(View) 좋음"/>
            </div>
             <div>
              <label className="block text-sm font-medium">반려동물</label>
              <select name="pets" value={formData.pets} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>불가능</option>
                <option>가능</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium">흡연</label>
              <select name="smoking" value={formData.smoking} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>불가능</option>
                <option>가능</option>
              </select>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium">비고/특이사항</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="비밀번호, 집주인 요청사항, 임차인 상태 등"></textarea>
            </div>
        </div>
      </fieldset>

      {/* 6. 소유자/임대인 정보 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">6. 소유자/임대인 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
                <label className="block text-sm font-medium">성명</label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium">연락처</label>
                <input type="text" name="ownerContact" value={formData.ownerContact} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </div>
        </div>
      </fieldset>

      {/* 7. 미디어 정보 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">7. 미디어 정보</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">매물 사진 (최대 10개) <span className="text-red-500">*</span></label>
            <input type="file" name="propertyImages" multiple onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <div>
            <label className="block text-sm font-medium">YouTube URL</label>
            <input type="text" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="https://youtu.be/..."/>
          </div>
          <div>
            <label className="block text-sm font-medium">홈페이지 URL</label>
            <input type="text" name="homepageUrl" value={formData.homepageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="https://example.com"/>
          </div>
        </div>
      </fieldset>

      {/* 8. 매물 상태 관리 */}
      <fieldset className="border p-4 rounded-md">
        <legend className="text-xl font-semibold px-2">8. 매물 상태 관리</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">매물 진행여부</label>
            <select name="propertyStatus" value={formData.propertyStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>공개</option>
              <option>미공개</option>
              <option>보류</option>
            </select>
          </div>
        </div>
      </fieldset>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <div className="text-center pt-4">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">매물 등록하기</button>
      </div>

    </form>
  );
}
