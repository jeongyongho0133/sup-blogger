import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  if (process.env.NODE_ENV === 'development') {
    // In development, use the Firestore Emulator
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8081';
    admin.initializeApp({
      projectId: 'demo-project', // A dummy project ID for the emulator
    });
  } else {
    // In production, use service account credentials
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

const db = admin.firestore();

export { db as adminDb };
