// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAAUcrSSwtF-HiwP6NJwJE4EAfioL2NVNw",
  authDomain: "hackathon-c89f6.firebaseapp.com",
  projectId: "hackathon-c89f6",
  storageBucket: "hackathon-c89f6.appspot.com",
  messagingSenderId: "97674743215",
  appId: "1:97674743215:web:c01fd26c7270100d26b35a",
  measurementId: "G-4QTPWKEV8F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const firestore = getFirestore(app)
export { app, auth, storage, firestore };