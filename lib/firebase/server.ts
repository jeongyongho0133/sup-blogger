import 'server-only';
import type { App, AppOptions } from 'firebase-admin/app';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Decode the base64 service account key from the environment variable
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  ? Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
  : '{}';

const serviceAccount = JSON.parse(serviceAccountString);

const options: AppOptions = {
  credential: cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
};

let app: App;

// ❗️ 에뮬레이터 환경 변수가 존재하더라도, 명시적으로 null을 할당하여 비활성화합니다.
if (process.env.NODE_ENV === 'development') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = undefined;
  process.env.FIRESTORE_EMULATOR_HOST = undefined;
  process.env.STORAGE_EMULATOR_HOST = undefined;
}

if (getApps().length === 0) {
  app = initializeApp(options);
} else {
  app = getApp();
}

export const serverAuth = getAuth(app);
export const serverFirestore = getFirestore(app);
export const serverStorage = getStorage(app);
