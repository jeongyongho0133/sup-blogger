'use client';

import { useState } from 'react';

// Mock data for users - In a real app, this would be fetched from an API
const mockUsers = [
  { id: 1, name: '김철수', email: 'chulsoo.kim@example.com', userType: 'owner', status: 'active', joinedDate: '2023-01-15' },
  { id: 2, name: '박영희', email: 'younghee.park@example.com', userType: 'buyer', status: 'active', joinedDate: '2023-02-20' },
  { id: 3, name: '이중개', email: 'agent.lee@example.com', userType: 'agent', status: 'suspended', joinedDate: '2023-03-10' },
  { id: 4, name: '최임차', email: 'tenant.choi@example.com', userType: 'buyer', status: 'pending', joinedDate: '2023-04-05' },
  { id: 5, name: '정소유', email: 'owner.jung@example.com', userType: 'owner', status: 'active', joinedDate: '2023-05-21' },
];

const UserStatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  if (status === 'active') return <span className={`${baseClasses} bg-green-100 text-green-800`}>활성</span>;
  if (status === 'suspended') return <span className={`${baseClasses} bg-red-100 text-red-800`}>정지</span>;
  return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>대기</span>;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">사용자 관리</h1>
      
      <div className="mb-4">
        <input 
          type="text"
          placeholder="이름 또는 이메일로 검색..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.userType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserStatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select 
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className="p-1 border rounded-md"
                  >
                    <option value="active">활성</option>
                    <option value="suspended">정지</option>
                    <option value="pending">대기</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
