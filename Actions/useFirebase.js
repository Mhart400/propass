import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default function useFirebase() {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA-yDIpd7ed5S3cxaoDn01MS4Dgtl-lgM0",
    authDomain: "propass-bd1cd.firebaseapp.com",
    projectId: "propass-bd1cd",
    storageBucket: "propass-bd1cd.appspot.com",
    messagingSenderId: "836423022245",
    appId: "1:836423022245:web:52926873e740b1d7a77f4c",
    measurementId: "G-2XTET82GRR",
  };

  // Firebase Objects ===============
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return {
    app,
    db,
    auth,
    storage,
  };
}
