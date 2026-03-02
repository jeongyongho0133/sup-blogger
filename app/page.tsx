'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Property 타입 정의 (필요에 따라 수정)
interface Property {
  id: string;
  title: string;
  price: string;
  type: string;
  dealType: string;
  location: string;
  image: string;
}

// 임시 데이터 (원래 initialProperties)
const initialProperties: Property[] = [
  { id: 'p001', title: '강남구 역삼동 아파트', price: '매매 15억', type: '아파트', dealType: '매매', location: '서울시 강남구', image: '/placeholder-image.svg' },
  { id: 'p002', title: '서초구 반포동 신축 빌라', price: '전세 8억', type: '빌라', dealType: '전세', location: '서울시 서초구', image: '/placeholder-image.svg' },
  { id: 'p003', title: '마포구 서교동 원룸', price: '월세 100/1000', type: '원룸/오피스텔', dealType: '월세', location: '서울시 마포구', image: '/placeholder-image.svg' },
  { id: 'p004', title: '종로구 평창동 단독주택', price: '매매 30억', type: '주택', dealType: '매매', location: '서울시 종로구', image: '/placeholder-image.svg' },
  { id: 'p005', title: '성동구 성수동 지식산업센터', price: '월세 500/5000', type: '상가/사무실', dealType: '월세', location: '서울시 성동구', image: '/placeholder-image.svg' },
  { id: 'p006', title: '용산구 한남동 고급 아파트', price: '전세 20억', type: '아파트', dealType: '전세', location: '서울시 용산구', image: '/placeholder-image.svg' },
  { id: 'p007', title: '송파구 잠실동 오피스텔', price: '매매 5억', type: '원룸/오피스텔', dealType: '매매', location: '서울시 송파구', image: '/placeholder-image.svg' },
  { id: 'p008', title: '강남구 청담동 상가', price: '월세 1000/1억', type: '상가/사무실', dealType: '월세', location: '서울시 강남구', image: '/placeholder-image.svg' },
];

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '전체',
    dealType: '전체',
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const { location, propertyType, dealType } = filters;
      const locationMatch = location.trim() === '' || property.location.includes(location.trim());
      const propertyTypeMatch = propertyType === '전체' || property.type === propertyType;
      const dealTypeMatch = dealType === '전체' || property.dealType === dealType;
      return locationMatch && propertyTypeMatch && dealTypeMatch;
    });
  }, [filters, properties]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero Section + Search Bar */}
      <div className="text-center bg-white p-10 rounded-lg shadow-lg mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">집을 찾으셨나요?</h1>
        <p className="text-lg text-gray-600 mb-8">신뢰할 수 있는 부동산 거래의 시작. Project RE가 함께합니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="지역명(예: 강남구)을 입력하세요"
            className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="전체">모든 매물</option>
            <option value="아파트">아파트</option>
            <option value="빌라">빌라</option>
            <option value="주택">주택</option>
            <option value="원룸/오피스텔">원룸/오피스텔</option>
            <option value="상가/사무실">상가/사무실</option>
          </select>
          <select
            name="dealType"
            value={filters.dealType}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="전체">모든 거래</option>
            <option value="매매">매매</option>
            <option value="전세">전세</option>
            <option value="월세">월세</option>
          </select>
        </div>
      </div>
      
      {/* 매물 목록 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">추천 매물</h2>
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <Link href={`/property/${property.id}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
                      <p className="text-indigo-600 font-bold mt-1">{property.price}</p>
                      <p className="text-sm text-gray-500 mt-2">{property.location}</p>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">찾으시는 조건에 맞는 매물이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
