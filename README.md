# Project RE

신뢰할 수 있는 부동산 거래의 시작. Project RE가 함께합니다.

## ✨ 주요 기능

*   **최신 매물 목록:** 구매, 판매 및 임대를 위한 최신 부동산 매물 정보를 제공합니다.
*   **다국어 지원:** 한국어와 영어 간의 언어 전환 기능을 제공합니다.
*   **사용자 인증:** Firebase Auth를 통해 안전한 사용자 인증 시스템을 구축했습니다.
*   **서비스 약관:** `/terms/paid` 및 `/terms/privacy`에서 약관 및 개인정보 처리방침을 확인할 수 있습니다.

## 💻 기술 스택

*   **프레임워크:** [Next.js](https://nextjs.org/) (App Router)
*   **언어:** [TypeScript](https://www.typescriptlang.org/)
*   **데이터베이스:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
*   **스타일링:** [Tailwind CSS](https://tailwindcss.com/)
*   **다국어 (i18n):** [react-i18next](https://react.i18next.com/)

## 🚀 시작 가이드

개발 환경을 설정하고 실행하려면 다음 단계를 따르세요.

### 1. 의존성 설치

npm을 사용하여 필요한 의존성을 설치합니다:

```bash
npm install
```

### 2. 환경 변수 설정

이 프로젝트는 백엔드로 Firebase를 사용합니다. Firebase 프로젝트를 설정하고 서비스 계정 인증 정보를 얻어야 합니다.

1.  프로젝트 루트에 `.env.local` 파일을 생성합니다.
2.  Firebase 서비스 계정 인증 정보를 파일에 추가합니다. 이 정보는 base64로 인코딩된 JSON 문자열이어야 합니다.

```
FIREBASE_SERVICE_ACCOUNT_BASE64=<YOUR_BASE64_ENCODED_SERVICE_ACCOUNT_KEY>
```

### 3. 데이터베이스 시딩

초기 샘플 데이터로 데이터베이스를 채우려면 시드 스크립트를 실행하세요:

```bash
npm run db:seed
```

이 명령은 Firestore `properties` 컬렉션에 몇 가지 샘플 매물을 추가합니다.

### 4. 개발 서버 실행

Next.js 개발 서버를 시작합니다:

```bash
npm run dev
```

애플리케이션은 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.
