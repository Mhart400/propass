// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const auth = app.auth()
export default app