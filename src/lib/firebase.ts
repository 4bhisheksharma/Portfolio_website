import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";

// Firebase web configuration — Strictly read from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firebase client initialization:", err);
  }
}

export { app, db };

// ---------------------------------------------------------------------------
// Document fetch helpers with local fallback
// ---------------------------------------------------------------------------

export async function fetchDocData<T>(docId: string, fallback: T): Promise<T> {
  const cacheKey = `portfolio_cache_${docId}`;
  if (!db) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached) as T;
    } catch {}
    return fallback;
  }

  try {
    const snap = await getDoc(doc(db, "portfolio", docId));
    if (snap.exists()) {
      const data = snap.data() as T;
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch {}
      return data;
    }
  } catch (err) {
    console.warn(`Firestore read failed for portfolio/${docId}:`, err);
  }

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as T;
  } catch {}

  return fallback;
}

// ---------------------------------------------------------------------------
// Realtime document listener with local cache update
// ---------------------------------------------------------------------------

export function subscribeToDoc<T>(
  docId: string,
  onData: (data: T) => void,
  fallback: T
): Unsubscribe {
  const cacheKey = `portfolio_cache_${docId}`;

  // Prime immediately with cached value if present
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      onData(JSON.parse(cached) as T);
    }
  } catch {}

  if (!db) {
    onData(fallback);
    return () => {};
  }

  return onSnapshot(
    doc(db, "portfolio", docId),
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as T;
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch {}
        onData(data);
      } else {
        onData(fallback);
      }
    },
    (err) => {
      console.warn(`Firestore subscription error for portfolio/${docId}:`, err);
      onData(fallback);
    }
  );
}
