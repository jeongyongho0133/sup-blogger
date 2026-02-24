export default function PaidServiceTermsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">유료 서비스 이용약관</h1>
      <div className="space-y-4 text-gray-700">
        <p>본 약관은 [회사명] (이하 "회사")가 제공하는 유료 서비스의 이용과 관련하여 필요한 사항을 규정합니다. 본 약관은 서비스 이용약관의 일부를 구성하며, 함께 적용됩니다.</p>

        <h2 className="text-xl font-semibold pt-4">제1조 (유료 서비스의 종류)</h2>
        <p>회사는 다음과 같은 유료 서비스를 제공할 수 있으며, 서비스의 구체적인 내용 및 가격은 서비스 페이지에 별도로 게시합니다.</p>
        <ul className="list-disc list-inside pl-4">
          <li>프리미엄 매물 등록</li>
          <li>광고 상품</li>
          <li>기타 회사가 정하는 유료 콘텐츠 및 기능</li>
        </ul>
        <p>(현재 모든 서비스는 무료로 제공되고 있으며, 유료 서비스 전환 시 별도 공지 예정입니다.)</p>

        <h2 className="text-xl font-semibold pt-4">제2조 (결제 및 이용)</h2>
        <p>1. 회원은 회사가 정한 결제 수단을 이용하여 유료 서비스를 결제할 수 있습니다.</p>
        <p>2. 유료 서비스는 결제가 완료된 시점부터 약정된 기간 동안 이용할 수 있습니다.</p>

        <h2 className="text-xl font-semibold pt-4">제3조 (청약 철회 및 환불 규정)</h2>
        <p>1. 회원은 "전자상거래 등에서의 소비자보호에 관한 법률" 등 관련 법령에 따라 청약을 철회하거나 환불을 요청할 수 있습니다.</p>
        <p>2. 회사는 회사의 귀책사유로 인하여 회원이 유료 서비스를 이용하지 못하는 경우, 이용하지 못한 기간만큼을 보상하거나 환불 규정에 따라 처리합니다.</p>
        <p>3. 단순 변심에 의한 환불 요청 시, 서비스 이용 내역 등을 고려하여 회사의 내부 환불 정책에 따라 처리됩니다. 구체적인 환불 기준은 각 유료 서비스 안내 페이지에 별도로 고지됩니다.</p>

        <h2 className="text-xl font-semibold pt-4">제4조 (약관의 변경)</h2>
        <p>회사는 필요한 경우 유료 서비스 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.</p>

        <p className="pt-6 text-sm text-gray-500">* 본 약관은 예시이며, 실제 유료 서비스 제공 시에는 구체적인 내용과 법률 전문가의 검토가 필요합니다.</p>
      </div>
    </div>
  );
}
