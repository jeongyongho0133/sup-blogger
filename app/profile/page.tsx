import TrustLevelIndicator from '@/app/components/TrustLevelIndicator';

// This is a mock user data. In a real application, you would fetch this from your database.
const mockUser = {
  name: '김철수',
  email: 'chulsoo.kim@example.com',
  userType: 'owner',
  trustScore: 85, // Example score
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">마이 프로필</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">{mockUser.name}</h2>
            <p className="text-gray-600">{mockUser.email}</p>
            <p className="capitalize mt-2 text-sm text-gray-500">({mockUser.userType} 회원)</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <TrustLevelIndicator score={mockUser.trustScore} />
        </div>
      </div>
    </div>
  );
}
