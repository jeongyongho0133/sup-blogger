// Base interface for all users
interface BaseUser {
  uid: string;
  email: string;
  name: string; // Real name
  phoneNumber: string; // Verified phone number
  address: string; // Default activity area
  agreedToTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Owner Member ---

interface OwnerPreferences {
  preferredTransactionType?: ('sale' | 'jeonse' | 'wolse')[];
  interestedAreas?: string[];
  kakaoTalkNotifications?: boolean;
}

// Base for all owner types, without the discriminating 'membershipType'
interface OwnerMemberBase extends BaseUser {
  userType: 'owner';
  preferences: OwnerPreferences;
  listings: string[]; // Array of listing IDs
}

export interface FreeOwnerMember extends OwnerMemberBase {
  membershipType: 'free';
  // listings limit 1-3 would be enforced by logic, not type
}

export interface PremiumOwnerMember extends OwnerMemberBase {
  membershipType: 'premium';
  identityVerified: boolean;
  propertyRegistryVerified?: boolean; // Optional for higher trust
  bankAccountVerified: boolean; // For preventing fraudulent listings
}

export type OwnerMember = FreeOwnerMember | PremiumOwnerMember;


// --- Agent Member ---

export interface AgentProfile {
  profilePictureUrl: string;
}

// Base for all agent types, without the discriminating 'membershipType'
interface AgentMemberBase extends BaseUser {
  userType: 'agent';
  agentLicenseNumber: string;
  brokerageRegistrationNumber: string;
  businessRegistrationNumber: string;
  officeAddress: string;
  profile: AgentProfile;
  isApproved: boolean; // Requires admin approval
  listings: string[]; // Array of listing IDs
}

export interface FreeAgentMember extends AgentMemberBase {
  membershipType: 'free';
   // listings limit 5 would be enforced by logic, not type
}

export interface ProAgentMember extends AgentMemberBase {
  membershipType: 'pro' | 'premium'; // Pro, Premium (area-exclusive)
  exclusiveArea?: {
    city: string;
    district: string; // e.g., 'eup' or 'dong'
  };
}

export type AgentMember = FreeAgentMember | ProAgentMember;


// --- Admin ---

type AdminRole = 'super_admin' | 'listing_manager' | 'cs_manager';

export interface Admin extends BaseUser {
  userType: 'admin';
  role: AdminRole;
}


// --- Union type for any user ---

export type User = OwnerMember | AgentMember | Admin;
