'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for reports
const mockReports = [
  { id: 201, listingId: 103, listingAddress: '경기도 성남시 분당구', reporterName: '박선우', reason: '허위 매물 의심', details: '해당 주소에 이 매물이 존재하지 않습니다. 확인 바랍니다.', reportDate: '2023-06-11', status: 'new' },
  { id: 202, listingId: 101, listingAddress: '서울시 강남구 역삼동', reporterName: '김민준', reason: '정보 부정확', details: '가격 정보가 실제와 다릅니다. 월세가 120만원이라고 합니다.', reportDate: '2023-06-12', status: 'new' },
  { id: 203, listingId: 102, listingAddress: '서울시 마포구 합정동', reporterName: '이서연', reason: '연락 두절', details: '게시자가 전화를 받지 않고 문자에도 답이 없습니다.', reportDate: '2023-06-13', status: 'in_review' },
  { id: 204, listingId: 105, listingAddress: '부산시 해운대구 우동', reporterName: '정현우', reason: '기타', details: '이미 계약이 완료된 매물입니다.', reportDate: '2023-06-16', status: 'resolved' },
];

const ReportStatusBadge = ({ status }: { status: string }) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    if (status === 'new') return <span className={`${baseClasses} bg-red-100 text-red-800`}>신규</span>;
    if (status === 'in_review') return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>검토중</span>;
    if (status === 'resolved') return <span className={`${baseClasses} bg-green-100 text-green-800`}>처리완료</span>;
    return null;
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [expandedReportId, setExpandedReportId] = useState<number | null>(null);

  const handleStatusChange = (reportId: number, newStatus: 'new' | 'in_review' | 'resolved') => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">신고 관리</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고 대상 매물</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고 사유</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map(report => (
              <>
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/listings?id=${report.listingId}`} className="text-sm font-medium text-blue-600 hover:underline">{report.listingAddress} (ID: {report.listingId})</Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.reporterName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.reportDate}</td>
                  <td className="px-6 py-4"><ReportStatusBadge status={report.status} /></td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2 whitespace-nowrap">
                    <button onClick={() => setExpandedReportId(expandedReportId === report.id ? null : report.id)} className="text-indigo-600 hover:text-indigo-900">상세</button>
                  </td>
                </tr>
                {expandedReportId === report.id && (
                    <tr>
                        <td colSpan={6} className="p-4 bg-gray-50">
                            <div className="p-4 bg-white rounded-lg shadow-inner">
                                <h4 className="font-bold mb-2">상세 신고 내용:</h4>
                                <p className="text-gray-700 mb-4">{report.details}</p>
                                <h4 className="font-bold mb-2">처리:</h4>
                                <div className="flex items-center space-x-2">
                                    <span>상태 변경:</span>
                                    <button onClick={() => handleStatusChange(report.id, 'in_review')} disabled={report.status === 'in_review'} className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:bg-gray-300">검토 중</button>
                                    <button onClick={() => handleStatusChange(report.id, 'resolved')} disabled={report.status === 'resolved'} className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-300">처리 완료</button>
                                    <Link href={`/admin/listings`} className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">매물 관리로 이동</Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
