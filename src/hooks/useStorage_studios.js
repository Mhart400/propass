import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import useFirestore from "./useFirestore";
import { storage, db } from "../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  list,
  listAll,
} from "firebase/storage";
import { serverTimestamp, getDoc, doc } from "firebase/firestore";

function useStorage_studios() {
  const { userProfile } = useAuth();
  const {
    addStudioDoc,
    deleteStudioDocs,
    saveStudioData_Nested,
    retrieveStudioData_allNested,
    updateStudioData_addToArray,
  } = useFirestore();
  const [progress, setProgress] = useState();
  const [url, setUrl] = useState();
  const [uploadError, setUploadError] = useState();
  const [studioData, setStudioData] = useState();

  async function deleteStudioDocsFromStorage(
    studioId,
    subcollectionName,
    file
  ) {
    // Deletes docs in storage subCollection EXCEPT for "file" parameter
    // if file === null, deletes all files in subCollection
    if (file !== null) {
      console.log(
        `Deleting Old Files from Storage in subCollection ${subcollectionName} except for ${file.name}`
      );
      const storageRef = ref(
        storage,
        `Studios/${studioId}/${subcollectionName}/${file.name}`
      );
      const filesInDir = list(storageRef.parent).then((res) => {
        res.items.forEach((item) => {
          //DELETE each item IF filename isn't the same as filename beng uploaded (file.name)
          if (item.name !== file.name) {
            const objectRef = ref(storage, item.fullPath);
            deleteObject(objectRef);
          }
        });
      });
    } else {
      console.log(
        `Deleting Old Files from Storage from subCollection ${subcollectionName}`
      );
      const storageRef = ref(
        storage,
        `Studios/${studioId}/${subcollectionName}`
      );
      const filesInDir = listAll(storageRef).then((res) => {
        res.items.forEach((item) => {
          const objectRef = ref(storage, item.fullPath);
          deleteObject(objectRef);
        });
      });
      

    }
  }

  async function uploadStudioDoc(studioId, subcollectionName, file, replace) {
    // save doc to storage
    const storageRef = ref(
      storage,
      `Studios/${studioId}/${subcollectionName}/${file.name}`
    );

    //STEP 1 - DELETE OLD DOCS IF REPLACE === true
    if (replace === true) {
      //   //Delete from firestore
      //   console.log("Deleting from Firestore");
      //   const delFirestore = await deleteStudioDocs(studioId, subcollectionName);

      //Delete from storage
      console.log("Deleting from Storage");
      const delStorage = await deleteStudioDocsFromStorage(
        studioId,
        subcollectionName,
        file
      );
    }

    //STEP 2 - upload to STORAGE
    const uploadTask = uploadBytesResumable(storageRef, file);
    //Monitor progress of uploadTask:
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Bytes Transferred:");
        console.log(percentage.bytesTransferred);
        setProgress(percentage);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (err) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setUploadError(err);
        console.log(uploadError);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);

          let saveObj = {};
          if (replace === true) {
            console.log(`Saving ${file.name} to firestore - Nested`);
            saveObj[subcollectionName] = {
              filename: file.name,
              url: downloadURL,
              createdAt: serverTimestamp(),
            };
            saveStudioData_Nested(studioId, saveObj);
          } else {
            // replace= false -->> get data and APPEND to array
            console.log(`Appending ${file.name} to Firestore`);
            saveObj = {
              filename: file.name,
              url: downloadURL,
              // I get an error when trying to use serverTimestamp()
            };
            updateStudioData_addToArray(studioId, subcollectionName, saveObj);
          }
        });
      }
    );

    return { progress, url, uploadError };
  }

  return { uploadStudioDoc, deleteStudioDocsFromStorage };
}

export default useStorage_studios;
