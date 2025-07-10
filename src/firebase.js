// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGh1_PJSA4-4fKnCKqh8sFlBsmxI6wnpM",
  authDomain: "asbhub-beb0f.firebaseapp.com",
  projectId: "asbhub-beb0f",
  storageBucket: "asbhub-beb0f.firebasestorage.app",
  messagingSenderId: "1005014506156",
  appId: "1:1005014506156:web:f487257a12aab5957b1d09",
  measurementId: "G-LVTLLP7EC6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


