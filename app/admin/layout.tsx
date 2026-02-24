import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          <Link href="/admin">관리자 패널</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/users" className="block p-2 rounded hover:bg-gray-700">사용자 관리</Link>
          <Link href="/admin/listings" className="block p-2 rounded hover:bg-gray-700">매물 관리</Link>
          <Link href="/admin/reports" className="block p-2 rounded hover:bg-gray-700">신고 관리</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
