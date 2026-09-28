import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = (error as any)?.code || '';

  const isNetworkOrOffline = 
    errorCode === 'unavailable' ||
    errorCode === 'failed-precondition' ||
    errorMessage.includes('unavailable') ||
    errorMessage.includes('offline') ||
    errorMessage.includes('Could not reach Cloud Firestore backend') ||
    errorMessage.includes('network');

  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  if (isNetworkOrOffline) {
    console.warn('Firestore offline / network status (operating in local fallback mode):', JSON.stringify(errInfo));
    return;
  }

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on boot as mandated by the Firebase skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    const msg = error instanceof Error ? error.message : String(error);
    if (error?.code === 'unavailable' || msg.includes('offline') || msg.includes('unavailable') || msg.includes('Could not reach')) {
      console.warn("Firestore client is offline or network error:", msg);
    } else {
      console.warn("Firestore connection check note:", msg);
    }
  }
}
testConnection();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    // Gracefully handle normal user cancellation without logging fatal error or crashing
    if (
      firebaseError?.code === 'auth/popup-closed-by-user' ||
      firebaseError?.code === 'auth/cancelled-popup-request' ||
      firebaseError?.message?.includes('popup-closed-by-user') ||
      firebaseError?.message?.includes('cancelled-popup-request')
    ) {
      console.info("Google sign-in popup was closed by user.");
      return null;
    }
    if (firebaseError?.code === 'auth/popup-blocked' || firebaseError?.message?.includes('popup-blocked')) {
      console.warn("Google sign-in popup was blocked by browser.");
      return null;
    }
    console.error("Google login failed:", firebaseError?.message || error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
