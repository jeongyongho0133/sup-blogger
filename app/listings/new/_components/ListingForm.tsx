'use client';

import { useState, FormEvent } from 'react';

export default function ListingForm() {
  const [listingType, setListingType] = useState('rent'); // 'rent' or 'sale'
  const [propertyType, setPropertyType] = useState('apartment'); // e.g., 'apartment', 'house', 'office'
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic Validation
    if (!address || !price || !description) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    // In a real application, you would send this data to your API
    // For example: await fetch('/api/listings', { ... });

    console.log({ listingType, propertyType, address, price, description });

    // Simulate a successful submission
    setSuccess('매물이 성공적으로 등록되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">매물 종류</label>
        <select value={listingType} onChange={(e) => setListingType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="rent">임대</option>
          <option value="sale">매매</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">건물 종류</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="apartment">아파트</option>
          <option value="house">단독주택</option>
          <option value="officetel">오피스텔</option>
          <option value="store">상가</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">주소</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {listingType === 'rent' ? '보증금 / 월세 (만원)' : '매매가 (만원)'}
        </label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder={listingType === 'rent' ? '예: 5000 / 100' : '예: 100000'} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">상세 설명</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>

      {/* Add fields for image uploads, floor, size, etc. later */}

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md">매물 등록하기</button>
    </form>
  );
}
