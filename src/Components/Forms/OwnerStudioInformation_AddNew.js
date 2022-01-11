import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Divider,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import states from "../../Data/states";
import PageLoading from "../PageLoading";



function OwnerStudioInformation_AddNew({ values, collectStudioInfo }) {
  const { userProfile, getProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);

  const [formValues, setFormValues] = useState(values);

  //Refs
  const nameRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const phoneRef = useRef();
  const rateRef = useRef();

  //State drop-down select
  const [state, setState] = React.useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  //Error Handling values
  const [nameError, setNameError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [zipError, setZipError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [rateError, setRateError] = useState(null);

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
  
  const checkRateError = (refName) => {
    const value = refName.current.value;
    const regex = /^[1-9][0-9]*$/
    if (!regex.test(value)) {
      return 'Rate must be greater than 0'
    } else {
      return null
    }
  }

  //Handle Editing & Saving
  const editValues = () => {
    setEditing(true);
  };

  const [errorsExist, setErrorsExist] = useState(false)

  const updateErrors = () => {
    setNameError(checkNameError(nameRef));
    setAddressError(checkNameError(addressRef));
    setCityError(checkNameError(cityRef));
    setZipError(checkZipError(zipRef));
    setPhoneError(checkPhoneError(phoneRef));
    setRateError(checkRateError(rateRef))
  }
  
  const checkForErrors = () => {
    //Set state to new inputs
    setNameError(checkNameError(nameRef));
    setAddressError(checkNameError(addressRef));
    setCityError(checkNameError(cityRef));
    setZipError(checkZipError(zipRef));
    setPhoneError(checkPhoneError(phoneRef));
    setRateError(checkRateError(rateRef))


    // check to see if there are errors
    const errorList = [
      checkNameError(nameRef),
      checkNameError(addressRef),
      checkNameError(cityRef),
      checkZipError(zipRef),
      checkPhoneError(phoneRef),
      checkRateError(rateRef)
    ];
    console.log(errorList);
    
    return errorList.some((item) => item !== null)
  };


  async function saveValues() {
    setLoading(true);

    // Handle logic to allow save
    if (checkForErrors() === true) {
      setLoading(false);
      return false;
    } else {
      collectStudioInfo({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
        phone: phoneRef.current.value,
        rate: rateRef.current.value,
      });
      setLoading(false);
    }
  }

  //Refresh data on page useEffect
  // useEffect(() => {
  //   setLoading(true);
  //   if (userProfile !== null && userProfile !== undefined) {
  //       setFormValues(userProfile);
  //     setLoading(false);
  //   }
  // }, [editing]);

  return (
    <Box component="form" sx={{ my: "15px" }}>
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
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
              Studio Information
            </Typography>
          </Box>
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ width: "100%", backgroundColor: "text.primary" }}
        />
      </Grid>

      {/* Form Body */}
      <Box sx={{ width: "100%", position: "relative" }}>
        {loading && <PageLoading />}

        <Grid container direction="column" sx={{ width: "100%" }}>
          {/* //FIRST NAME & LAST NAME */}
          <Grid
            container
            item
            direction="row"
            sx={{
              "& .MuiTextField-root": {
                mr: 2,
                my: 1,
                width: "100%",
                backgroundColor: editing
                  ? "background.default"
                  : "background.primary",
              },
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="studioName"
              label="Studio Name"
              defaultValue={formValues.name}
              variant="standard"
              size="small"
              disabled={!editing}
              inputRef={nameRef}
              error={nameError !== null}
              helperText={nameError !== null ? nameError : ""}
              // onChange={updateErrors}
            />

            <TextField
              id="description"
              label="Studio Description"
              defaultValue={formValues.description}
              variant="standard"
              multiline
              size="small"
              disabled={!editing}
              inputRef={descriptionRef}
              // error={studioNameError !== null}
              helperText={""}
            />
            
            <TextField
              id="rate"
              label="Hourly Rate ($/hour)"
              defaultValue={formValues.rate}
              variant="standard"
              size="small"
              disabled={!editing}
              inputRef={rateRef}
              error={rateError !== null}
              helperText={rateError !== null ? rateError : ''}
              helperText={""}
            />

            {/* //ADDRESS ROW */}
            <TextField
              id="address"
              label="Address"
              defaultValue={formValues.address ? formValues.address : " -"}
              variant="standard"
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
              disabled={!editing}
              inputRef={phoneRef}
              sx={{ width: "12ch" }}
              error={phoneError !== null}
              helperText={phoneError !== null ? phoneError : ""}
            />
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Button onClick={saveValues}>Next</Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default OwnerStudioInformation_AddNew;
