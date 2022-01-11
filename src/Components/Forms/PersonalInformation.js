import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Divider,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import states from "../../Data/states";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PageLoading from "../PageLoading";
import { collection, updateDoc, where, query, getDocs, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase-config'
import useFirestore from "../../hooks/useFirestore";

function PersonalInformation() {
  const { userProfile, getProfile } = useAuth();
  const { saveUserData_Nested }  = useFirestore()
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(userProfile);

  //Refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const phoneRef = useRef();

  //State drop-down select
  const [state, setState] = React.useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  //Error Handling values
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [zipError, setZipError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

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
    setAddressError(checkNameError(addressRef));
    setCityError(checkNameError(cityRef));
    setZipError(checkZipError(zipRef));
    setPhoneError(checkPhoneError(phoneRef));
    
    // check to see if there are errors
    const errorList = [
      checkNameError(firstNameRef),
      checkNameError(lastNameRef),
      checkNameError(addressRef),
      checkNameError(cityRef),
      checkZipError(zipRef),
      checkPhoneError(phoneRef),
    ];
    console.log(errorList)
    const errorsExist = errorList.some(item => item !== null);

    // Handle logic to allow save
    if (errorsExist === true) {
      setLoading(false)  
      return false;
    } else {
        //Save to database)
    
        console.log('No Errors Exist, saving to DB')
        saveUserData_Nested(userProfile.id, {
          'firstName': firstNameRef.current.value,
          'lastName': lastNameRef.current.value,
          'address': addressRef.current.value,
          'city': cityRef.current.value,
          'state': stateRef.current.value,
          'zip': zipRef.current.value,
          'phone': phoneRef.current.value,
          'lastUpdated': serverTimestamp()
        })

        
        //Update Profile in AuthContext
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
              Owner Information
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

          {/* //ADDRESS ROW */}
            <TextField
              id="address"
              label="Address"
              defaultValue={formValues.address ? formValues.address : " -"}
              variant="standard"
              size='small'
              disabled={!editing}
              inputRef={addressRef}
              sx={{ width: { md: "25ch", sm: "18ch", xs: "18ch" } }}
              error={addressError !== null}
              helperText={addressError !== null ? addressError : ""}
            />

            <TextField
              id="city"
              label="City"
              defaultValue={formValues.city ? formValues.city : " -"}
              variant="standard"
              size='small'
              disabled={!editing}
              inputRef={cityRef}
              sx={{ width: { md: "16ch", sm: "12ch", xs: "12ch" } }}
              error={cityError !== null}
              helperText={cityError !== null ? cityError : ""}
            />

            <TextField
              id="state"
              label="State"
              defaultValue={formValues.state ? formValues.state : "MA"}
              variant="standard"
              size='small'
              disabled={!editing}
              inputRef={stateRef}
              select
              onChange={handleState}
              SelectProps={{ MenuProps: { sx: { maxHeight: "300px" } } }}
              sx={{ width: "6ch" }}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="zip"
              label="Zip"
              defaultValue={formValues.zip ? formValues.zip : " -"}
              variant="standard"
              size='small'
              disabled={!editing}
              inputRef={zipRef}
              sx={{ width: "8ch" }}
              error={zipError !== null}
              helperText={zipError !== null ? zipError : ""}
            />
            
            <TextField
              id="phone"
              label="Phone"
              defaultValue={formValues.phone ? formValues.phone : " -"}
              variant="standard"
              size='small'
              disabled={!editing}
              inputRef={phoneRef}
              sx={{ width: "12ch" }}
              error={phoneError !== null}
              helperText={phoneError !== null ? phoneError : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PersonalInformation;
