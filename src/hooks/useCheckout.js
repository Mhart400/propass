import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
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
import { usePreviousProps } from "@mui/utils";

function useCheckout() {
  const { userProfile } = useAuth();
  const { cartItems } = useCart();

  async function saveBookingToFirestore(cartItem) {
    let dbRef = collection(db, "Bookings");
    try {
        const id = await addDoc(dbRef, cartItem);
        console.log(`Successfully saved booking ${id}`);
    } catch (error) {
        console.log(error);
    }
}

async function saveCartItemsToFirestore() {
    console.log("Saving cartItems to Firestore")
    console.log(JSON.stringify(cartItems));
    cartItems.forEach(item => {
        saveBookingToFirestore({
            ...item,
            proId: userProfile.id,
            proFirstName: userProfile.firstName,
            proLastName: userProfile.lastName,
        });
    })
  }

  return { saveBookingToFirestore, saveCartItemsToFirestore };
}

export default useCheckout;
