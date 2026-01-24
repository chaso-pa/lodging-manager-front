import { initializeApp, getApp, getApps } from 'firebase/app';

type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

const parseFirebaseConfig = (): FirebaseWebConfig => {
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CREDENTIAL_JSON;
  if (!raw) {
    throw new Error('Missing NEXT_PUBLIC_FIREBASE_CREDENTIAL_JSON');
  }

  try {
    return JSON.parse(raw) as FirebaseWebConfig;
  } catch (error) {
    throw new Error('Invalid NEXT_PUBLIC_FIREBASE_CREDENTIAL_JSON', { cause: error });
  }
};

const firebaseConfig = parseFirebaseConfig();

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
