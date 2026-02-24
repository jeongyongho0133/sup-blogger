import { adminDb } from '../lib/firebase/server';
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
  // Add more properties as needed...
];

async function seedDatabase() {
  const propertiesCollection = adminDb.collection('properties');

  console.log('Starting to seed database...');

  for (const prop of properties) {
    try {
      const docRef = await propertiesCollection.add({
        ...prop,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`Added property with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  }

  console.log('Database seeding completed.');
  process.exit(0);
}

seedDatabase();
