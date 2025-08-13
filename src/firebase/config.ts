import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBzPUqw5EPPhDIUFQqtnVUdy8el8RRzJ40",
  authDomain: "codebattle-ecbdf.firebaseapp.com",
  projectId: "codebattle-ecbdf",
  storageBucket: "codebattle-ecbdf.firebasestorage.app",
  messagingSenderId: "176360651527",
  appId: "1:176360651527:web:9d7edda85866f5db1663a2",
  measurementId: "G-0SMX7YR030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional - only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app; 