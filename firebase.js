// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAhwaMdTDaHouEywZ158xqAAZIuSkyd2HE",
  authDomain: "gudsnus-76d4d.firebaseapp.com",
  projectId: "gudsnus-76d4d",
  storageBucket: "gudsnus-76d4d.firebasestorage.app",
  messagingSenderId: "652233541473",
  appId: "1:652233541473:web:87690037d80138d5526720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

export { db };
