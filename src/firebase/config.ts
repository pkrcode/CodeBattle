import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBzPUqw5EPPhDIUFQqtnVUdy8el8RRzJ40",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "codebattle-ecbdf.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "codebattle-ecbdf",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "codebattle-ecbdf.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "176360651527",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:176360651527:web:9d7edda85866f5db1663a2",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-0SMX7YR030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional - only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Firebase connection utilities
export const firebaseUtils = {
  enableNetwork: () => enableNetwork(db),
  disableNetwork: () => disableNetwork(db),
  isOnline: () => navigator.onLine
};

export default app; 