// src/components/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'; // Firestore imports

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrBPVC0npoM1MsXzyhQnHLKdhe-Q98XBI",
  authDomain: "instafolio-5fc6d.firebaseapp.com",
  databaseURL: "https://instafolio.firebaseio.com",
  projectId: "instafolio-5fc6d",
  storageBucket: "instafolio-5fc6d.firebasestorage.app",
  messagingSenderId: "235855788279",
  appId: "1:235855788279:web:b21662cb53b63696c6fbf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Export everything needed for high score logic
export {
  db,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
};
