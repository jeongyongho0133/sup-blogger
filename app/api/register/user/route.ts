import { NextResponse } from 'next/server';

// 임시 사용자 데이터베이스 역할을 할 Set
const existingUsers = new Set([
  'test@example.com',
]);

export async function POST(request: Request) {
  try {
    const { name, email, phoneNumber, password } = await request.json();

    // 1. 필수 입력 정보 확인
    if (!name || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { message: '이름, 이메일, 휴대폰 번호, 비밀번호는 필수입니다.' },
        { status: 400 } // Bad Request
      );
    }

    // 2. 이메일 중복 확인 (임시 데이터베이스 사용)
    if (existingUsers.has(email)) {
      return NextResponse.json(
        { message: '이미 가입된 이메일입니다.' },
        { status: 409 } // Conflict
      );
    }

    // 3. (실제 앱에서는 여기에 데이터베이스에 사용자 정보를 저장하는 로직이 들어갑니다)
    // 예: const newUser = await db.user.create({ data: { name, email, ... } });
    console.log(`새로운 사용자 등록: ${name}, ${email}`);
    existingUsers.add(email); // 임시 데이터베이스에 추가

    // 4. 회원가입 성공 응답
    return NextResponse.json(
      { message: `환영합니다, ${name}님! 회원가입이 성공적으로 완료되었습니다.` },
      { status: 201 } // Created
    );

  } catch (error) {
    console.error('회원가입 API 오류:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 } // Internal Server Error
    );
  }
}
