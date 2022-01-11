import { useEffect, useState } from "react";
import { storage, db } from "../firebase-config";
import { useAuth } from "../Context/AuthContext";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const useStorage = (file, collectionName, replace) => {
  //Save FILE in STORAGE and FIRESTORE
  //repalce is a boolean... 'true' --> only store 1 file. 'False' --> store multiple files

  //FIRESTORE SAVE OPTION: 1) NESTED to USER, 2) ADD DOC

  // references
  const { userProfile, getProfile } = useAuth();
  const [progress, setProgress] = useState();
  const [uploadError, setUploadError] = useState();
  const [url, setUrl] = useState();

  const storageRef = ref(
    storage,
    `${userProfile.email}/${collectionName}/${file.name}`
  );

  //Save the document link to Firestore for a User
  async function saveLinksToFirestore(collectionName, replace, url) {
    const dbRef = collection(db, "Users");

    //Step 1: get the User Record Unique ID
    const q = await getDocs(
      query(dbRef, where("email", "==", userProfile.email))
    );
    let uid = [];
    q.forEach((doc) => uid.push(doc));
    const userRecord = uid[0].id;
    console.log(userRecord);

    //Step 2: Add a collection for IMAGES OR FILES to each user
    // let x = {};
    // x[category] = {
    //   url: url,
    //   createdAt: serverTimestamp(),
    // };
    // const obj = x;
    // console.log(obj);

    if (replace === true) {
      console.log("Attempting to setDoc (replace = true)");
      console.log(file.name);
      const newDocRef = doc(collection(dbRef, userRecord, collectionName));
      await setDoc(newDocRef, {
        filename: file.name,
        url: url,
        createdAt: serverTimestamp(),
      });
      console.log("setDoc Completed");
    } else {
      // use addDoc to add new (don't overwrite)
      console.log("Attempting to addDoc (replace = false)");
      // get the count of items, then increment by 1
      await addDoc(
        collection(dbRef, userRecord, collectionName),
        {
          filename: file.name,
          url: url,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log("addDoc Completed");
    }
    //  update userProfile in useAuth
    getProfile(userProfile.email);
    console.log("updated Profile held in AuthContext");
  }

  useEffect(() => {
    //Upload the file to Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    //Then monitor progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        switch (err.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  }, [file, collectionName, replace]);


  //If replace === true, Delete docs in FireStore & Storage
  async function deleteOldDocs(collectionName, replace) {
    //Delete files in STORAGE if "replace" === true
    if (url && replace === true) {
      console.log("REPLACE = TRUE... Deleting Old Files from Storage");
      const filesInDir = list(storageRef.parent).then((res) => {
        res.items.forEach((item) => {
          //DELETE each item IF filename isn't the same as filename beng uploaded (file.name)
          if (item.name !== file.name) {
            const objectRef = ref(storage, item.fullPath);
            deleteObject(objectRef);
          }
        });
      });
      
      //Delete files in FIRESTORE if "replace" === true
      console.log("REPLACE = TRUE... Deleting Old Files from Firestore");
      const q = query(collection(db, "Users", userProfile.id, collectionName), where("filename", "!=", file.name))
      const docQuery = await getDocs(q)
      console.log(docQuery);
      docQuery.forEach((item) => {
        console.log(`Deleting filename: ${item.data().filename}`)
        try {
          deleteDoc(item.ref)
          console.log(`Delete Successful`)
        } catch (error) {
          console.log(`Delete NOT Successful`)
          console.log(error)
        }
        });
      }
    }
  

    
    //Once files have been uploaded to storage, need to
    // 1) Save to Firestore Database, and
    // 2) Delete old files if replace == True
    if (progress === 100 && url) {
      console.log("Saving links to FireStore");
      saveLinksToFirestore(collectionName, replace, url);
      console.log('Deleting old files IF "replace" = "true"')
      deleteOldDocs(collectionName, replace);
  }

  return { progress, url, uploadError };
};

export default useStorage;
