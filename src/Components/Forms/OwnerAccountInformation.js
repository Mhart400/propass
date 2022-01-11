import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PageLoading from "../PageLoading";
import { collection, updateDoc, where, query, getDocs, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase-config'

function OwnerAccountInformation() {
  const { userProfile, getProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(userProfile);

  //Refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();


  //State drop-down select
  const [state, setState] = React.useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  //Error Handling values
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);


  //Error Handling Rules
  const checkNameError = (refName) => {
    if (refName.current.value.length < 2) {
      return "Must be more than 2 characters";
    } else {
      return null;
    }
  };

  const checkZipError = (refName) => {
    const value = refName.current.value;
    const regex = /^\d{5}$/;
    if (!regex.test(value)) {
      return "Zip Code must be 5 digits";
    } else {
      return null;
    }
  };
  
  const checkPhoneError = (refName) => {
    const value = refName.current.value;
    const regex = /^\d{10}$/;
    if (!regex.test(value)) {
      return "Phone number must be 10 digits";
    } else {
      return null;
    }
  };
  //Check all refs for errors

  //Handle Editing & Saving
  const editValues = () => {
    setEditing(true);
  };

  async function saveValues() {
    setLoading(true)  
    //Set state to new inputs
    setFirstNameError(checkNameError(firstNameRef));
    setLastNameError(checkNameError(lastNameRef));

    
    // check to see if there are errors
    const errorList = [
      checkNameError(firstNameRef),
      checkNameError(lastNameRef),

    ];
    console.log(errorList)
    const errorsExist = errorList.some(item => item !== null);

    // Handle logic to allow save
    if (errorsExist === true) {
      setLoading(false)  
      return false;
    } else {
        //get record in db, update it (save to database)
        const users = collection(db, "Users");
        const q = await getDocs(query(users, where("email", "==", userProfile.email)));
        console.log(q);
        let uid = []
        q.forEach(doc => uid.push(doc))
        const record = uid[0].id
        console.log(`UPdating record ${record}`)
        const docRef = doc(db, "Users", record);
        const done = await updateDoc(docRef, {
            'firstName': firstNameRef.current.value,
            'lastName': lastNameRef.current.value,
            'lastUpdated': serverTimestamp()
        });
        getProfile(userProfile.email)
        setEditing(false);
        setLoading(false)
    }
  };

  //Refresh data on page useEffect
  useEffect(() => {
    setLoading(true);
    if (userProfile !== null && userProfile !== undefined) {
        setFormValues(userProfile);
      setLoading(false);
    }
  }, [editing]);

  return (
    <Box component="form" sx={{ my: "15px", mb: 10}}>
      <Grid
        container
        direction="column"
        sx={{ justifyContent: "flex-start", alignItems: "flex-start", my: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: '100%',
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: 'flex-start' }}>
            <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
              Owner Contact Information
            </Typography>
            <IconButton onClick={editing ? saveValues : editValues} size='small' sx={{color: 'text.primary'}}>
            {editing ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Box>
          
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ width: "100%", backgroundColor: "text.primary" }}
        />
      </Grid>

     {/* Form Body */}
      <Box sx={{ width: "100%", position: 'relative'}}>
        {loading && <PageLoading />}

        <Grid container direction="column" sx={{width: '100%'}}>
          {/* //FIRST NAME & LAST NAME */}
          <Grid
            container
            item
            direction="row"
            sx={{
              "& .MuiTextField-root": {
                mr: 2,
                my: 1,
                width: '100%',
                backgroundColor: editing ? "background.default" : "background.primary",
              },
              justifyContent: "space-between",
            }}
          >
            
              <TextField
                id="firstName"
                label="First Name"
                defaultValue={formValues.firstName}
                variant="standard"
                size='small'
                disabled={!editing}
                inputRef={firstNameRef}
                error={firstNameError !== null}
                helperText={firstNameError !== null ? firstNameError : ""}
              />
            
              <TextField
                id="lastName"
                label="Last Name"
                defaultValue={formValues.lastName}
                variant="standard"
                size='small'
                disabled={!editing}
                inputRef={lastNameRef}
                error={lastNameError !== null}
                helperText={lastNameError !== null ? lastNameError : ""}      
              />
        
              <TextField
                disabled
                id="email"
                label="Email"
                defaultValue={formValues.email}
                variant="standard"
                size='small'
                // inputProps={{ readOnly: !editing }}
                // inputRef={emailRef}
              />
            
              <TextField
                disabled
                id="role"
                label="Role"
                defaultValue={formValues.isPro === true ? "Pro" : "Owner"}
                variant="standard"
                size='small'
                // inputProps={{ readOnly: !editing }}
                // inputRef={roleRef}
              />

          
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default OwnerAccountInformation;
