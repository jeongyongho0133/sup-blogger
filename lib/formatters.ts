export function formatPrice(price: number): string {
  // 0 또는 유효하지 않은 값일 경우 '0원'을 반환합니다.
  if (!price || price < 1) return '0원';

  const eok = Math.floor(price / 100000000); // 억 단위 계산
  const man = Math.floor((price % 100000000) / 10000); // 만 단위 계산

  let result = '';

  // 억 단위가 0보다 크면 결과 문자열에 추가합니다.
  if (eok > 0) {
    result += `${eok.toLocaleString()}억`;
  }

  // 만 단위가 0보다 크면 결과 문자열에 추가합니다.
  if (man > 0) {
    if (result.length > 0) result += ' '; // 억 단위가 있을 경우 공백 추가
    result += `${man.toLocaleString()}만`;
  }
  
  // 가격이 10,000원 미만일 경우, 원 단위로만 표시합니다.
  if (eok === 0 && man === 0) {
      return `${price.toLocaleString()}원`;
  }

  return result + '원';
}
