export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Placeholder for Total Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">총 사용자</h2>
          <p className="text-3xl font-bold">1,234</p> {/* Mock Data */}
        </div>

        {/* Placeholder for Total Listings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">총 매물 수</h2>
          <p className="text-3xl font-bold">567</p> {/* Mock Data */}
        </div>

        {/* Placeholder for New Reports */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">새로운 신고</h2>
          <p className="text-3xl font-bold text-red-500">12</p> {/* Mock Data */}
        </div>

      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">빠른 작업</h2>
        <div className="flex space-x-4">
            <a href="/admin/users" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">사용자 관리 바로가기</a>
            <a href="/admin/listings" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">매물 관리 바로가기</a>
        </div>
      </div>
    </div>
  );
}
