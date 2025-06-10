// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// 🔑 여기에 본인의 firebaseConfig 붙여넣기
const firebaseConfig = {
    apiKey: "AIzaSyAJt2sLMgFynWuI1ohiHVcSwx3NApbc0Cg",
    authDomain: "next-todo-f052b.firebaseapp.com",
    projectId: "next-todo-f052b",
    storageBucket: "next-todo-f052b.firebasestorage.app",
    messagingSenderId: "926472239020",
    appId: "1:926472239020:web:ccea59a3c37dd97dd52c09",
    measurementId: "G-VVHT1TZQKQ"
  };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
