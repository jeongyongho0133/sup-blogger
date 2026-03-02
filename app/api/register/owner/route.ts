import { NextResponse } from 'next/server';

// 임시 임대인 데이터베이스 역할을 할 Set
const existingOwners = new Set([
  'owner@example.com',
]);

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, password } = await request.json();

    // 1. 필수 입력 정보 확인
    if (!name || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: '필수 입력 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 2. 이메일 중복 확인
    if (existingOwners.has(email)) {
      return NextResponse.json(
        { message: '이미 가입된 이메일입니다.' },
        { status: 409 }
      );
    }

    // 3. 데이터베이스에 임대인 정보 저장 (시뮬레이션)
    console.log(`새로운 임대인 등록: ${name}, ${email}`);
    existingOwners.add(email); // 임시 데이터베이스에 추가

    // 4. 회원가입 성공 응답
    return NextResponse.json(
      { message: `임대인으로 가입하신 것을 환영합니다, ${name}님!` },
      { status: 201 }
    );

  } catch (error) {
    console.error('임대인 가입 API 오류:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
