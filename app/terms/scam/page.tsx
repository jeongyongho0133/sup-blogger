export default function ScamPolicyPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">사기성 매물 정책</h1>
      <div className="space-y-4 text-gray-700">
        <p>저희 플랫폼은 모든 사용자가 신뢰할 수 있는 정보를 바탕으로 안전하게 거래할 수 있는 환경을 만들기 위해 최선을 다하고 있습니다. 이를 위해 사기성 또는 허위 매물 게시를 엄격히 금지하며, 아래와 같은 정책을 시행합니다.</p>

        <h2 className="text-xl font-semibold pt-4">제1조 (사기성 매물의 정의)</h2>
        <p>다음과 같은 경우 사기성 또는 허위 매물로 간주될 수 있습니다:</p>
        <ul className="list-disc list-inside pl-4">
          <li>존재하지 않는 매물을 등록하는 경우</li>
          <li>매물의 가격, 위치, 상태 등 중요 정보를 허위로 기재하는 경우</li>
          <li>다른 사람의 매물 사진이나 정보를 무단으로 도용하는 경우</li>
          <li>계약금이 과도하게 높거나, 시세와 현저히 차이나는 가격으로 사용자를 현혹하는 경우</li>
          <li>정당한 사유 없이 연락을 회피하거나, 추가적인 부당한 요구를 하는 경우</li>
        </ul>

        <h2 className="text-xl font-semibold pt-4">제2조 (사기성 매물 신고)</h2>
        <p>사기성 매물로 의심되는 경우, 각 매물 상세 페이지에 있는 '신고하기' 버튼을 통해 신고할 수 있습니다. 신고 시에는 구체적인 사유와 증거 자료(예: 문자 메시지, 통화 내용)를 함께 제출해주시면 더욱 빠른 처리가 가능합니다.</p>

        <h2 className="text-xl font-semibold pt-4">제3조 (위반 시 조치)</h2>
        <p>사기성 매물로 확인될 경우, 회사는 다음과 같은 조치를 취할 수 있습니다:</p>
        <ul className="list-disc list-inside pl-4">
          <li>해당 매물 즉시 삭제</li>
          <li>게시자 계정 영구 정지</li>
          <li>필요 시 수사기관에 관련 정보 제공</li>
          <li>피해 금액에 대한 민사 소송 지원</li>
        </ul>

        <p className="pt-6 font-semibold">저희 플랫폼은 사용자의 안전한 거래를 위해 항상 노력하겠습니다. 의심스러운 점이 있다면 언제든지 고객센터로 문의해주시기 바랍니다.</p>
      </div>
    </div>
  );
}
