import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCzVLeONJbrF0bgADn7ZDHBJDfUkPDRCuw",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "mapsol-7e43e.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mapsol-7e43e",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "mapsol-7e43e.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "372322880070",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:372322880070:web:b14121e5a2318276ead847",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-L9PTVGC06L"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Firestore initialisieren
export const db = getFirestore(app);

// Firebase Authentication initialisieren
export const auth = getAuth(app);

export default app;

