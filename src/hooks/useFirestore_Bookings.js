import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

function useFirestore_Bookings() {
  const { userProfile } = useAuth();
  const [bookings, setBookings] = useState();
  
  async function retrieveBookings(setterFunction) {
    const q = query(collection(db, "Bookings"), where("proId", "==", userProfile.id));
    onSnapshot(q, (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          let docObject = doc.data();
          docObject["id"] = doc.id;
          documents.push(docObject);
        });
        // documents.sort((first, second) => second.startDate - first.year);
        setterFunction(documents);
      });
  }

  return {retrieveBookings};
}

export default useFirestore_Bookings;
