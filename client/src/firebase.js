// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a29d7.firebaseapp.com",
  projectId: "mern-estate-a29d7",
  storageBucket: "mern-estate-a29d7.firebasestorage.app",
  messagingSenderId: "533651115807",
  appId: "1:533651115807:web:ab628ab46612d99b316a2a"
};

export const app = initializeApp(firebaseConfig);