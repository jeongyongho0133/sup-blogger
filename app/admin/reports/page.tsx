'use client';

import { useState } from 'react';
import Link from 'next/link';

// 💡 임시 신고 데이터
const initialReports = [
  {
    id: 'r001',
    reportType: '매물',
    targetId: 'p001',
    reporter: '이영희',
    reason: '허위 정보 게시',
    details: '사진과 실제 매물의 상태가 너무 다릅니다. 벽지에 곰팡이가 심해요.',
    date: '2024-05-22',
    status: '접수됨',
  },
  {
    id: 'r002',
    reportType: '사용자',
    targetId: 'u003',
    reporter: '김철수',
    reason: '비매너 채팅',
    details: '매물과 관련 없는 무례한 질문을 계속 보냅니다.',
    date: '2024-05-21',
    status: '접수됨',
  },
  {
    id: 'r003',
    reportType: '매물',
    targetId: 'p004',
    reporter: '박지성',
    reason: '사기 의심',
    details: '시세보다 현저히 낮은 가격으로 계약금을 먼저 요구합니다.',
    date: '2024-05-20',
    status: '처리 완료',
  },
];

// 신고 처리 상태에 따른 뱃지 스타일
const getStatusBadge = (status: string) => {
  switch (status) {
    case '접수됨': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{status}</span>;
    case '처리 완료': return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{status}</span>;
    default: return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">{status}</span>;
  }
};

const AdminReportsPage = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState<typeof initialReports[0] | null>(null);

  // 신고 처리 상태 변경 (접수됨 -> 처리 완료)
  const handleProcessReport = (reportId: string) => {
    // 🚀 BUGFIX: 문자열 안에 작은따옴표가 포함될 경우, 전체를 큰따옴표로 감싸서 문법 오류를 해결합니다.
    if (confirm("해당 신고 건을 '처리 완료' 상태로 변경하시겠습니까?")) {
      setReports(currentReports =>
        currentReports.map(report =>
          report.id === reportId ? { ...report, status: '처리 완료' } : report
        )
      );
    }
  };

  // 신고 내역 보관 (목록에서 제거)
  const handleArchiveReport = (reportId: string) => {
    if (confirm('이 신고 내역을 보관하시겠습니까? 목록에서 사라집니다.')) {
      setReports(currentReports => currentReports.filter(report => report.id !== reportId));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">신고 관리</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고 유형</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고 사유</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고자</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신고일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.reportType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.reporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => setSelectedReport(report)} className="font-semibold text-indigo-600 hover:text-indigo-900">상세</button>
                    {report.status === '접수됨' && (
                      <button onClick={() => handleProcessReport(report.id)} className="font-semibold text-green-600 hover:text-green-900">처리</button>
                    )}
                    {report.status === '처리 완료' && (
                      <button onClick={() => handleArchiveReport(report.id)} className="font-semibold text-gray-500 hover:text-gray-800">보관</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 신고 상세 정보 모달 */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">신고 상세 정보 (ID: {selectedReport.id})</h3>
            </div>
            <div className="p-6 space-y-4">
              <p><strong className="w-24 inline-block">신고 유형:</strong> {selectedReport.reportType}</p>
              <p><strong className="w-24 inline-block">신고 대상 ID:</strong> 
                <Link href={selectedReport.reportType === '매물' ? `/property/${selectedReport.targetId}` : `/admin/users`} className="text-indigo-600 hover:underline">
                  {selectedReport.targetId} (바로가기)
                </Link>
              </p>
              <p><strong className="w-24 inline-block">신고자:</strong> {selectedReport.reporter}</p>
              <p><strong className="w-24 inline-block">신고 사유:</strong> {selectedReport.reason}</p>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-semibold">상세 내용:</p>
                <p className="text-gray-700 mt-1">{selectedReport.details}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
              <button onClick={() => setSelectedReport(null)} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportsPage;
