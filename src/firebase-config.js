// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBzCkhW0qxQGO5Vi6Gv4D3RQaG3sGibSns",
  authDomain: "studiopro-d559e.firebaseapp.com",
  projectId: "studiopro-d559e",
  storageBucket: "studiopro-d559e.appspot.com",
  messagingSenderId: "548431673581",
  appId: "1:548431673581:web:c42af9e77746a996f8f4e4",
  measurementId: "G-1VPG0WWSYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore();
export const storage = getStorage(app);