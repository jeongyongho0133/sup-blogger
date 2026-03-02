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
if (getApps().length === 0) {
  app = initializeApp(options);
} else {
  app = getApp();
}

// Initialize Firebase services for admin/scripting purposes.
export const adminAuth = getAuth(app);
export const adminFirestore = getFirestore(app);
export const adminStorage = getStorage(app);
