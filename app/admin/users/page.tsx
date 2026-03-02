'use client';

import { useState } from 'react';

// 💡 임시 회원 데이터.
const initialUsers = [
  { id: 'u001', name: '김철수', email: 'chulsoo.kim@example.com', joinDate: '2024-05-15', status: '활성' },
  { id: 'u002', name: '이영희', email: 'younghee.lee@example.com', joinDate: '2024-05-12', status: '활성' },
  { id: 'u003', name: '박지성', email: 'jisung.park@example.com', joinDate: '2024-04-28', status: '정지' },
  { id: 'u004', name: '최민호', email: 'minho.choi@example.com', joinDate: '2024-03-10', status: '활성' },
  { id: 'u005', name: '정수빈', email: 'soobin.jung@example.com', joinDate: '2024-02-20', status: '탈퇴' },
];

// 사용자 상태에 따른 뱃지 스타일
const getStatusBadge = (status: string) => {
  switch (status) {
    case '활성': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{status}</span>;
    case '정지': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">{status}</span>;
    case '탈퇴': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">{status}</span>;
    default: return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">{status}</span>;
  }
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);

  // 사용자 상태 변경 핸들러 (예: 활성 <-> 정지)
  const handleToggleStatus = (userId: string) => {
    if (confirm('해당 유저의 상태를 변경하시겠습니까?')) {
      setUsers(currentUsers =>
        currentUsers.map(user =>
          user.id === userId ? { ...user, status: user.status === '활성' ? '정지' : '활성' } : user
        ).filter(user => user.status !== '탈퇴') // 탈퇴한 유저는 상태 변경 불가
      );
    }
  };

  // 사용자 삭제 핸들러
  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`정말로 '${userName}'님을 삭제하시겠습니까? 데이터는 복구할 수 없습니다.`)) {
      setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">회원 관리</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">가입일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                        onClick={() => handleToggleStatus(user.id)} 
                        disabled={user.status === '탈퇴'}
                        className={`font-semibold ${user.status === '활성' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'} disabled:text-gray-400 disabled:cursor-not-allowed`}>
                      {user.status === '활성' ? '정지' : '활성'}
                    </button>
                    <button onClick={() => handleDeleteUser(user.id, user.name)} className="font-semibold text-red-600 hover:text-red-900">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
