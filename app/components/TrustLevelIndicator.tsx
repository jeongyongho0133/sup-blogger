'use client';

interface TrustLevelIndicatorProps {
  score: number; // 0 to 100
}

export default function TrustLevelIndicator({ score }: TrustLevelIndicatorProps) {
  const getTrustLevel = () => {
    if (score >= 90) return { level: '매우 높음', color: 'bg-blue-500' };
    if (score >= 70) return { level: '높음', color: 'bg-green-500' };
    if (score >= 50) return { level: '보통', color: 'bg-yellow-500' };
    if (score >= 30) return { level: '낮음', color: 'bg-orange-500' };
    return { level: '매우 낮음', color: 'bg-red-500' };
  };

  const { level, color } = getTrustLevel();

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">신뢰 지수: {score}점</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className={`${color} h-4 rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-right mt-1 text-sm">{level}</p>
      <div className="mt-4 text-xs text-gray-600">
        <p>신뢰 지수는 다음을 기반으로 계산됩니다:</p>
        <ul className="list-disc list-inside">
          <li>본인 인증 여부</li>
          <li>매물 정보의 정확성</li>
          <li>이용자 후기 및 평점</li>
          <li>플랫폼 활동 내역</li>
        </ul>
      </div>
    </div>
  );
}
