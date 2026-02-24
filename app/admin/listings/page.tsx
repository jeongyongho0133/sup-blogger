'use client';

import { useState } from 'react';

// Mock data for listings
const mockListings = [
  { id: 101, address: '서울시 강남구 역삼동', owner: '김철수', price: '50000 / 100', status: 'active', postedDate: '2023-06-01', propertyType: '아파트' },
  { id: 102, address: '서울시 마포구 합정동', owner: '박영희', price: '120000', status: 'active', postedDate: '2023-06-05', propertyType: '오피스텔' },
  { id: 103, address: '경기도 성남시 분당구', owner: '이중개', price: '30000', status: 'reported', postedDate: '2023-06-10', propertyType: '빌라' },
  { id: 104, address: '서울시 종로구 평창동', owner: '최임차', price: '250000', status: 'removed', postedDate: '2023-05-12', propertyType: '단독주택' },
  { id: 105, address: '부산시 해운대구 우동', owner: '정소유', price: '8000 / 50', status: 'active', postedDate: '2023-06-15', propertyType: '아파트' },
];

const ListingStatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  if (status === 'active') return <span className={`${baseClasses} bg-green-100 text-green-800`}>게시중</span>;
  if (status === 'reported') return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>신고됨</span>;
  if (status === 'removed') return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>삭제됨</span>;
  return <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>;
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState(mockListings);
  const [filter, setFilter] = useState('all');

  const handleListingAction = (listingId: number, action: 'remove' | 'mark_fraudulent' | 'restore') => {
    setListings(listings.map(listing => {
      if (listing.id !== listingId) return listing;
      switch(action) {
        case 'remove':
          return { ...listing, status: 'removed' };
        case 'mark_fraudulent':
            // In a real app, this would also trigger user suspension
          return { ...listing, status: '사기성(삭제)' };
        case 'restore':
          return { ...listing, status: 'active' };
        default:
          return listing;
      }
    }));
  };

  const filteredListings = listings.filter(listing => 
    filter === 'all' || listing.status === filter
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">매물 관리</h1>

      <div className="mb-4 flex space-x-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}>전체</button>
        <button onClick={() => setFilter('active')} className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-white'}`}>게시중</button>
        <button onClick={() => setFilter('reported')} className={`px-4 py-2 rounded-lg ${filter === 'reported' ? 'bg-blue-500 text-white' : 'bg-white'}`}>신고됨</button>
        <button onClick={() => setFilter('removed')} className={`px-4 py-2 rounded-lg ${filter === 'removed' ? 'bg-blue-500 text-white' : 'bg-white'}`}>삭제됨</button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">매물 정보</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">게시자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">가격(만원)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">등록일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map(listing => (
              <tr key={listing.id}>
                <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{listing.address}</div>
                    <div className="text-sm text-gray-500">{listing.propertyType}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{listing.owner}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{listing.price}</td>
                <td className="px-6 py-4"><ListingStatusBadge status={listing.status} /></td>
                <td className="px-6 py-4 text-sm text-gray-500">{listing.postedDate}</td>
                <td className="px-6 py-4 text-sm font-medium space-x-2 whitespace-nowrap">
                  {listing.status !== 'removed' && listing.status !== '사기성(삭제)' ? (
                    <>
                        <button onClick={() => handleListingAction(listing.id, 'remove')} className="text-indigo-600 hover:text-indigo-900">삭제</button>
                        <button onClick={() => handleListingAction(listing.id, 'mark_fraudulent')} className="text-red-600 hover:text-red-900">허위처리</button>
                    </>
                  ) : (
                    <button onClick={() => handleListingAction(listing.id, 'restore')} className="text-green-600 hover:text-green-900">복원</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
