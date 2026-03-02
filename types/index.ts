export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: 'apartment' | 'villa' | 'officetel' | 'house' | 'store'; // 'store' 타입을 추가
  transactionType: 'sale' | 'rent';
  price: number;
  deposit?: number;
  rent?: number;
  address: string;
  area: number; // in square meters
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  status: 'available' | 'pending' | 'sold';
  images: string[];
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string; // Firestore document ID
  uid: string; // Firebase Auth User ID
  name: string;
  email: string;
  role: 'user' | 'agent' | 'admin';
  createdAt: Date;
}

export interface Report {
  id: string;
  listingId: string;
  reporterId: string;
  reason: string;
  details: string;
  status: 'new' | 'in_review' | 'resolved';
  createdAt: Date;
}
