import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";


export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userProfile, setUserProfile] = useState();
  
  function signup(email, password) {
    //return a user object
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //Before navigating to a page after login, save profile to state
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

  async function logout() {
    const noAuth = await signOut(auth)
    setUserProfile()
    return noAuth
  }
  

  useEffect( () => {
    // When user logs into another account or signs out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('UseEffect --> "user" now set as currentUser')
      console.log(user)
      
      if (user === null) {
        setUserProfile()
      } else if ('email' in user) {
        setUserProfile(user.email)
      } else {
        setUserProfile()
      }
    });
    return unsubscribe
  }, []);

  const value = { auth, currentUser, signup, login, logout, getProfile, userProfile};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
