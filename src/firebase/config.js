// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqMcA0pDKOZpH74jzelc29EWO6aHW8mjw",
  authDomain: "react-cursos-fcdc8.firebaseapp.com",
  projectId: "react-cursos-fcdc8",
  storageBucket: "react-cursos-fcdc8.appspot.com",
  messagingSenderId: "769515568505",
  appId: "1:769515568505:web:4541cdaf6e4876bb2e43a8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
