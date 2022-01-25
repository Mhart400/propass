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
import { useSnackbar } from 'notistack';

function useFirestore_Bookings() {
  const { userProfile } = useAuth();
  const [bookings, setBookings] = useState();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  
  async function retrieveBookings(setterFunction) {
    const q = query(collection(db, "Bookings"), where("proId", "==", userProfile.id));
    onSnapshot(q, (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          let docObject = doc.data();
          docObject["id"] = doc.id;
          documents.push(docObject);
        });
        documents.sort((first, second) => first.date - second.date);
        setterFunction(documents);
      });
  }
  
  async function retrieveBookingsByOwner(setterFunction) {
    const q = query(collection(db, "Bookings"), where("ownerId", "==", userProfile.id));
    onSnapshot(q, (snap) => {
        let documents = [];
        snap.forEach((doc) => {
          let docObject = doc.data();
          docObject["id"] = doc.id;
          documents.push(docObject);
        });
        documents.sort((first, second) => first.date - second.date);
        setterFunction(documents);
      });
  }

  async function deleteBooking(bookingId) {
    console.log("Deleting id# " + bookingId);
    try {
      const x = await deleteDoc(doc(db, "Bookings", bookingId))
      enqueueSnackbar("Success: Booking Cancelled", {variant: 'info'})
      return x
    } catch (error) {
      console.log("Unable to delete Booking. Message: " + error)
    }
  }


  return {retrieveBookings, retrieveBookingsByOwner, deleteBooking};
}

export default useFirestore_Bookings;
