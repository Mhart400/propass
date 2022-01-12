import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { useAuth } from "../Context/AuthContext";
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

//Use Firestore to get the list of documents in a given collection

function useFirestore() {
  const { userProfile } = useAuth();

  async function saveUserData_Nested(userId, fields) {
    // Saves data nested to a user. Does not save the data in a subcollection
    // update fields of a document without overwriting the entire document
    console.log("Saving nested data to User");
    const dbRef = doc(db, "Users", userId);
    await updateDoc(dbRef, fields);
    if (doc(dbRef).data()["id"] === "") {
      await updateDoc(dbRef, { id: userId });
    }
  }

  async function saveUserDoc_Named(userId, collectionName, docName, fields) {
    // This will overwrite a document. The document is named
    await setDoc(doc(db, "Users", userId, collectionName, docName), fields);
  }

  async function saveUserDoc_Unamed(userId, collectionName, fields) {
    // Adds a document with a generated ID.
    const docAdded = await addDoc(
      collection(db, "Users", userId, collectionName),
      fields
    );
    console.log("Doc Added. Updating with ID");
    updateDoc(docAdded, { id: docAdded.id });
    console.log("ID added");
    // return docAdded
  }

  async function updateUserDoc(userId, collectionName, docName, fields) {
    updateDoc(doc(db, "Users", userId, collectionName, docName), fields);
    console.log("Update successful");
  }

  async function deleteUserDoc(userId, collectionName, docId) {
    const docRef = doc(db, "Users", userId, collectionName, docId);
    try {
      deleteDoc(docRef);
      console.log("Delete Successful");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUserDocs(userId, collectionName) {
    // Deletes all documents in a collection for a given userId
    console.log("Attempting to delete Docs");
    try {
      const docQuery = await getDocs(
        collection(db, "Users", userId, collectionName)
      );
      console.log("docQuery retreived");
      docQuery.forEach((item) => {
        console.log(`Deleting file`);
        try {
          deleteDoc(item.ref);
          console.log(`Delete Successful`);
        } catch (error) {
          console.log(`Delete NOT Successful`);
          console.log(error);
        }
      });
      return "success";
    } catch (error) {
      console.log(error);
    }
    console.log("Deleting docs complete");
  }

  async function retrieveDocs(userId, collectionName, setterFunction) {
    // Given a collectionName, returns a list of all docs and their data fields
    // Everytime there is snapshot, use setterFunction to update state in component
    console.log(`Running getDocs for ${collectionName}`);
    onSnapshot(collection(db, "Users", userId, collectionName), (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        let docObject = doc.data();
        docObject["id"] = doc.id;
        documents.push(docObject);
      });
      documents.sort((first, second) => second.year - first.year);
      setterFunction(documents);
    });
  }

  async function retrieveUsers(role, setterFunction) {
    // Returns a list of users based on a role ("owner" or "pro")
    // Everytime there is snapshot, use setterFunction to update state in component
    console.log(`Getting list of users where role=${role}`);
    let q = null;
    if (role === "pro") {
      q = query(collection(db, "Users"), where("isPro", "==", true));
    } else {
      q = query(collection(db, "Users"), where("isOwner", "==", true));
    }
    onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        let docObject = doc.data();
        docObject["id"] = doc.id;
        documents.push(docObject);
      });
      setterFunction(documents);
    });
  }

  async function retrieveUserData_Nested(userId, key, setterFunction) {
    // Returns a nested data for 1 user

    onSnapshot(doc(db, "Users", userId), (doc) => {
      const data = doc.data();
      if (data) {
        console.log(data);
        setterFunction(data[key]);
      } else {
        setterFunction([]);
      }
    });
  }

  async function retrieveUserData_allNested(userId, setterFunction) {
    // Returns a nested data for 1 user

    onSnapshot(doc(db, "Users", userId), (doc) => {
      console.log(doc);
      const data = doc.data();
      if (data) {
        console.log(data);
        setterFunction(data);
      } else {
        setterFunction();
      }
    });
  }

  async function addStudio(fields) {
    // Saves a new Studio
    console.log("Adding new studio and Saving nested data");
    let dbRef = collection(db, "Studios");
    const updatedFields = {
      ...fields,
      ownerEmail: userProfile.email,
      ownerFirstName: userProfile.firstName,
      ownerLastName: userProfile.lastName,
      ownerId: userProfile.id,
      createdAt: serverTimestamp(),
    };
    const newRecord = await addDoc(dbRef, updatedFields);
    console.log(newRecord.id);

    console.log("updating with ID");
    dbRef = doc(db, "Studios", newRecord.id);
    await updateDoc(dbRef, { id: newRecord.id });
    console.log('"addStudio" Complete');

    return newRecord.id;
  }

  async function addStudioDoc(studioId, subcollectionName, fields) {
    // Adds a document with a generated ID.
    console.log("adding doc to Studio");
    try {
      const docAdded = await addDoc(
        collection(db, "Studios", studioId, subcollectionName),
        fields
      );
      console.log("Doc Added. Updating with ID");
      console.log(docAdded);
      updateDoc(docAdded, { id: docAdded.id });
      console.log("ID added");
      // return docAdded
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStudioDocs(studioId, subcollectionName) {
    // Deletes all documents in a collection for a given userId
    console.log(
      `Attempting to delete Docs for subcollection ${subcollectionName}`
    );
    try {
      const docQuery = await getDocs(
        collection(db, "Studios", studioId, subcollectionName)
      );
      docQuery.forEach((item) => {
        console.log(`Deleting file`);
        try {
          deleteDoc(item.ref);
          console.log(`Delete Successful`);
        } catch (error) {
          console.log(`Delete NOT Successful`);
          console.log(error);
        }
      });
      return "success";
    } catch (error) {
      console.log(error);
    }
    console.log("Deleting docs complete");
  }

  async function saveStudioData_Nested(studioId, fields) {
    // Saves data nested to a user. Does not save the data in a subcollection
    // update fields of a document without overwriting the entire document
    console.log("Saving nested data to Studio");
    const dbRef = doc(db, "Studios", studioId);
    await updateDoc(dbRef, fields);
  }


  async function updateStudioData_addToArray(studioId, field, arrayItem) {
    // Saves data nested to a user by adding to an array. 
    console.log("Saving nested data to Studio");
    const dbRef = doc(db, "Studios", studioId);
    try {
      await updateDoc(dbRef, {[`${field}`]: arrayUnion(arrayItem)});
      console.log(`Added to ${field} Array`)
    } catch (error) {
      console.log(error)
    }
  }


  async function retrieveStudioData_allNested(studioId, setterFunction) {
    // Returns a nested data for 1 studio
    console.log('Retrieving Nested Studio Data')
    onSnapshot(doc(db, "Studios", studioId), (doc) => {
      const data = doc.data();
      console.log(data)
      if (data) {
        setterFunction(data);
      } else {
        setterFunction();
      }
    });
  }


  async function retrieveAllStudios(setterFunction) {
    // Returns a list of ALL Studios
    // Everytime there is snapshot, use setterFunction to update state in component
    console.log(`Getting list of all studios`);
    const q = query(collection(db, "Studios"));
    onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push(doc.data());
      });
      setterFunction(documents);
    });
  }
  
  
  async function retrieveAllMyStudios(setterFunction) {
    // Returns a list of Studios for the user
    // Everytime there is snapshot, use setterFunction to update state in component
    console.log(`Getting list of all studios`);
    const q = query(collection(db, "Studios"), where('ownerId', '==', userProfile.id));
    onSnapshot(q, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push(doc.data());
      });
      setterFunction(documents);
    });
  }

  async function retrieveStudioDocs(studioId, subcollectionName, setterFunction) {
    // Given a subcollectionName, returns a list of all docs and their data fields
    // Everytime there is snapshot, use setterFunction to update state in component
    console.log(`Running getDocs for ${subcollectionName}`);
    onSnapshot(collection(db, "Studios", studioId, subcollectionName), (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        let docObject = doc.data();
        documents.push(docObject);
      });
      setterFunction(documents);
    });
  }



  return {
    saveUserData_Nested,
    saveUserDoc_Named,
    saveUserDoc_Unamed,
    updateUserDoc,
    deleteUserDoc,
    deleteUserDocs,
    retrieveDocs,
    retrieveUsers,
    retrieveUserData_Nested,
    retrieveUserData_allNested,

    //Studio functions
    addStudio,
    addStudioDoc,
    deleteStudioDocs,
    saveStudioData_Nested,
    updateStudioData_addToArray,
    retrieveStudioData_allNested,
    retrieveAllStudios,
    retrieveAllMyStudios,
    retrieveStudioDocs,
  };
}

export default useFirestore;
