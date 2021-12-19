import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userProfile, setUserProfile] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //Before navigating to page aftr login, call getProfile to save profile to state
  async function getProfile(email) {
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("email", "==", email));
      const results = await getDocs(q);
      let profile = [];
      results.forEach((doc) => {
        profile.push(doc.data());
      });
      setUserProfile(profile[0])
      return profile[0]
    } catch (error) {
      console.log(error)
    }
  }
  
  async function login(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userProfile = await getProfile(email)
    setUserProfile(userProfile)
    return {user, userProfile}
  }

  function logout() {
    setUserProfile(null)
    return signOut(auth);

  }
  

  useEffect( () => {
    // When user logs into another account or signs out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
    });
    return unsubscribe
  }, []);

  const value = { auth, currentUser, signup, login, logout, getProfile, userProfile};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
