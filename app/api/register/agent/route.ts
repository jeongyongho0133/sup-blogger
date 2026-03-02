import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// 임시 공인중개사 데이터베이스
const existingAgents = new Set(['agent@example.com']);

// 파일 저장 경로 (프로젝트 루트에 .tmp/uploads 폴더 생성)
const UPLOAD_DIR = path.join(process.cwd(), '.tmp', 'uploads');

// 업로드 폴더가 없으면 생성하는 함수
async function ensureUploadDirExists() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('업로드 폴더 생성 실패:', error);
    throw new Error('서버에서 파일을 저장할 폴더를 준비하는 데 실패했습니다.');
  }
}

export async function POST(request: Request) {
  try {
    await ensureUploadDirExists(); // 업로드 폴더 확인 및 생성

    const formData = await request.formData();

    // FormData에서 필드 값 추출
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const brokerageName = formData.get('brokerageName') as string;
    // ... 다른 텍스트 필드들도 동일하게 추출 ...

    // FormData에서 파일 추출
    const brokerageFile = formData.get('brokerageRegistrationFile') as File | null;
    const businessFile = formData.get('businessRegistrationFile') as File | null;

    // 1. 필수 정보 및 파일 유무 확인
    if (!name || !email || !brokerageName || !brokerageFile || !businessFile) {
      return NextResponse.json({ message: '필수 정보와 서류가 모두 제출되어야 합니다.' }, { status: 400 });
    }

    // 2. 이메일 중복 확인
    if (existingAgents.has(email)) {
      return NextResponse.json({ message: '이미 신청되거나 가입된 이메일입니다.' }, { status: 409 });
    }

    // 3. 파일 저장 로직
    const filesToSave = [brokerageFile, businessFile];
    for (const file of filesToSave) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // 파일 이름에 타임스탬프를 추가하여 중복 방지
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(UPLOAD_DIR, fileName);
      await fs.writeFile(filePath, buffer);
      console.log(`파일 저장 완료: ${filePath}`);
    }

    // 4. 데이터베이스에 공인중개사 신청 정보 저장 (시뮬레이션)
    console.log(`새로운 공인중개사 가입 신청: ${name}, ${email}`);
    existingAgents.add(email); // 임시 DB에 추가

    // 5. 신청 완료 성공 응답
    return NextResponse.json(
      { message: '회원가입 신청이 성공적으로 완료되었습니다. 관리자 승인 후 활동 가능합니다.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('공인중개사 가입 API 오류:', error);
    return NextResponse.json({ message: '서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
