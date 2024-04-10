// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a2f20.firebaseapp.com",
  projectId: "mern-blog-a2f20",
  storageBucket: "mern-blog-a2f20.appspot.com",
  messagingSenderId: "657002216850",
  appId: "1:657002216850:web:842366d5fb818296a2154b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);