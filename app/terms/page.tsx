import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">약관 및 정책</h1>
      <ul className="space-y-2">
        <li><Link href="/terms/service" className="text-blue-500 hover:underline">서비스 이용약관</Link></li>
        <li><Link href="/terms/privacy" className="text-blue-500 hover:underline">개인정보처리방침</Link></li>
        <li><Link href="/terms/fraudulent-listings" className="text-blue-500 hover:underline">허위매물 제재 규정</Link></li>
        <li><Link href="/terms/paid-service" className="text-blue-500 hover:underline">유료서비스 약관</Link></li>
        <li><Link href="/terms/refund" className="text-blue-500 hover:underline">환불 규정</Link></li>
        <li><Link href="/terms/dispute-resolution" className="text-blue-500 hover:underline">분쟁 해결 조항</Link></li>
      </ul>
    </div>
  );
}
