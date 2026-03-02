
import { serverFirestore } from '@/lib/firebase/server';
import PropertyImageCarousel from '@/app/components/PropertyImageCarousel';
import { Property } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { AgentMember } from '@/app/models/user'; 
import Image from 'next/image';

// Firestore에서 특정 ID의 매물 정보를 가져오는 함수
async function getProperty(id: string): Promise<Property | null> {
  try {
    const docRef = serverFirestore.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log('No such document!');
      return null;
    } else {
      const data = docSnap.data();
      if (!data) return null;
      
      // Firestore 타임스탬프를 JavaScript Date 객체로 변환
      const createdAt = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt._seconds * 1000);
      const updatedAt = data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt._seconds * 1000);

      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        propertyType: data.propertyType,
        transactionType: data.transactionType,
        price: data.price,
        deposit: data.deposit,
        rent: data.rent,
        address: data.address,
        area: data.area,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        amenities: data.amenities,
        status: data.status,
        images: data.images,
        agentId: data.agentId,
        createdAt: createdAt,
        updatedAt: updatedAt,
      };
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Firestore에서 특정 ID의 중개인 정보를 가져오는 함수
async function getAgent(id: string): Promise<AgentMember | null> {
  if (!id) return null;
  try {
    const docRef = serverFirestore.collection('users').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log('No such agent document!');
      return null;
    }
    return docSnap.data() as AgentMember;
  } catch (error) {
    console.error("Error fetching agent:", error);
    return null;
  }
}

type PageProps = {
  params: {
    id: string;
  };
};

// 페이지를 서버 컴포넌트로 변경 (async 사용)
export default async function PropertyDetailsPage({ params }: PageProps) {
  const property = await getProperty(params.id);
  const agent = property ? await getAgent(property.agentId) : null;

  if (!property) {
    return <div>매물을 찾을 수 없습니다.</div>;
  }

  // UI 렌더링 부분은 기존과 유사하게 유지하되, 실제 데이터를 사용합니다.
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <PropertyImageCarousel images={property.images} />
        ) : (
          <div className="relative h-96 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
              <p className="text-lg text-gray-600">{property.address}</p>
            </div>
            <div className="text-right flex-shrink-0">
              {property.transactionType === 'sale' ? (
                <p className="text-2xl font-bold text-blue-600">매매 {formatPrice(property.price)}</p>
              ) : (
                <p className="text-2xl font-bold text-blue-600">
                  보증금 {formatPrice(property.deposit ?? 0)} / 월세 {formatPrice(property.rent ?? 0)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b py-4 my-4">
            <div className="text-center">
              <p className="text-gray-500 text-sm">매물종류</p>
              <p className="font-semibold">{property.propertyType}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">전용면적</p>
              <p className="font-semibold">{property.area}㎡</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">침실 수</p>
              <p className="font-semibold">{property.bedrooms}개</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">욕실 수</p>
              <p className="font-semibold">{property.bathrooms}개</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">상세 정보</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>

          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">편의시설</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map(amenity => (
                  <span key={amenity} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {agent && (
            <div className="mt-8 pt-6 border-t">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">담당 공인중개사</h2>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Image 
                  src={agent.profile.profilePictureUrl || '/default-avatar.png'}
                  alt={`${agent.name} 공인중개사 프로필 사진`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                  <p className="text-gray-600">{agent.officeAddress}</p>
                  <p className="text-gray-600">연락처: {agent.phoneNumber}</p>
                  <p className="text-sm text-gray-500 mt-1">중개등록번호: {agent.brokerageRegistrationNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
