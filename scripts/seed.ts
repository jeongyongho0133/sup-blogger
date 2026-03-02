import { adminFirestore } from '../lib/firebase/admin';
import type { Property } from '../types';

const properties: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: '강남구 역삼동 럭셔리 아파트',
    description: '테헤란로에 위치한 최고급 아파트입니다. 교통이 편리하고 주변 편의시설이 완벽합니다.',
    propertyType: 'apartment',
    transactionType: 'rent',
    price: 0,
    deposit: 5000,
    rent: 100,
    address: '서울시 강남구 역삼동 123-45',
    area: 85,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['주차', '엘리베이터', '에어컨', '헬스장'],
    status: 'available',
    images: [],
    agentId: 'agent123'
  },
  {
    title: '마포구 합정동 신축 오피스텔',
    description: '합정역 초역세권에 위치한 신축 오피스텔입니다. 채광이 좋고 인테리어가 깔끔합니다.',
    propertyType: 'officetel',
    transactionType: 'sale',
    price: 12000,
    address: '서울시 마포구 합정동 567-89',
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['주차', '엘리베이터', '에어컨', '인터넷'],
    status: 'available',
    images: [],
    agentId: 'agent123'
  },
  {
    title: '서초구 반포동 리버뷰 아파트',
    description: '한강이 보이는 멋진 뷰를 자랑하는 아파트입니다. 조용하고 쾌적한 주거 환경.',
    propertyType: 'apartment',
    transactionType: 'sale',
    price: 35000,
    address: '서울시 서초구 반포동 111-22',
    area: 120,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['주차', '엘리베이터', '에어컨', '공원'],
    status: 'available',
    images: [],
    agentId: 'agent456'
  },
  {
    title: '종로구 평창동 단독주택',
    description: '북한산 자락에 위치한 조용한 단독주택. 넓은 정원과 함께하는 전원 생활.',
    propertyType: 'house',
    transactionType: 'sale',
    price: 50000,
    address: '서울시 종로구 평창동 333-44',
    area: 200,
    bedrooms: 5,
    bathrooms: 4,
    amenities: ['주차', '정원'],
    status: 'available',
    images: [],
    agentId: 'agent789'
  },
  {
    title: '성동구 성수동 로프트',
    description: '예술가들이 사랑하는 성수동의 트렌디한 로프트. 높은 천장과 유니크한 디자인.',
    propertyType: 'officetel',
    transactionType: 'rent',
    price: 0,
    deposit: 2000,
    rent: 150,
    address: '서울시 성동구 성수동 555-66',
    area: 70,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['엘리베이터', '에어컨'],
    status: 'available',
    images: [],
    agentId: 'agent123'
  },
  {
    title: '용산구 이태원동 루프탑 빌라',
    description: '이태원의 활기찬 분위기를 즐길 수 있는 루프탑 빌라. 멋진 야경은 덤.',
    propertyType: 'villa',
    transactionType: 'rent',
    price: 0,
    deposit: 3000,
    rent: 200,
    address: '서울시 용산구 이태원동 777-88',
    area: 90,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['주차', '루프탑'],
    status: 'available',
    images: [],
    agentId: 'agent456'
  },
  {
    title: '송파구 잠실동 레이크팰리스',
    description: '석촌호수 바로 앞에 위치한 고급 아파트. 롯데월드타워가 보이는 환상적인 뷰.',
    propertyType: 'apartment',
    transactionType: 'sale',
    price: 28000,
    address: '서울시 송파구 잠실동 999-00',
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['주차', '엘리베이터', '에어컨', '헬스장', '수영장'],
    status: 'available',
    images: [],
    agentId: 'agent789'
  },
  {
    title: '제주도 서귀포시 전원주택',
    description: '한라산과 바다가 모두 보이는 제주도의 아름다운 전원주택. 조용한 휴식을 원한다면.',
    propertyType: 'house',
    transactionType: 'sale',
    price: 18000,
    address: '제주특별자치도 서귀포시 안덕면 123-456',
    area: 150,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['주차', '정원', '바다뷰'],
    status: 'available',
    images: [],
    agentId: 'agent123'
  }
];

async function seedDatabase() {
  const propertiesCollection = adminFirestore.collection('properties');

  console.log('Starting to seed database...');

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const docId = `p${(i + 1).toString().padStart(3, '0')}`; // p001, p002, ...
    try {
      await propertiesCollection.doc(docId).set({
        ...prop,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`Added property with ID: ${docId}`);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  }

  console.log('Database seeding completed.');
  process.exit(0);
}

seedDatabase();
