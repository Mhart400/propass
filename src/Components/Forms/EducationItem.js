import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../Context/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";

function EducationItem({ index, school, degree, year, id, key, handleDelete }) {
  const { userProfile } = useAuth();
  const { saveUserDoc_Unamed, updateUserDoc } = useFirestore("Education");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDeleteModal, setConformDeleteModal] = useState(false);

  //TextField Refs
  const schoolRef = useRef();
  const degreeRef = useRef();
  const yearRef = useRef();

  //Error Handling Values
  const [schoolError, setSchoolError] = useState(null);
  const [degreeError, setDegreeError] = useState(null);
  const [yearError, setYearError] = useState(null);

  // Error handling rules
  const checkForBlanks = (refName) => {
    if (refName.current.value.length < 1) {
      return "Value cannot be blank";
    } else {
      return null;
    }
  };

  //Button Functions
  const editValues = () => {
    setEditing(true);
  };

  const saveValues = () => {
    setLoading(true);

    //Check for errors
    setSchoolError(checkForBlanks(schoolRef));
    setDegreeError(checkForBlanks(degreeRef));
    setYearError(checkForBlanks(yearRef));
    const errorList = [
      checkForBlanks(schoolRef),
      checkForBlanks(degreeRef),
      checkForBlanks(yearRef),
    ];
    const errorsExist = errorList.some((item) => item !== null);
    if (errorsExist) {
      console.log("CANNOT SAVE - FORM ERRORS");
      return false;
    } else {
      //IF item exists, overwrite it, else Save new
      if (id === '') { 
        // Document doesn't exist (id is blank) -> save new
        saveUserDoc_Unamed(userProfile.id, 'Education', {
          school: schoolRef.current.value,
          degree: degreeRef.current.value,
          year: yearRef.current.value,
          lastUpdated: serverTimestamp(),
        });
      } else {
        // Document exists (id not blank) -> save new
        updateUserDoc(userProfile.id, 'Education', id, {
          school: schoolRef.current.value,
          degree: degreeRef.current.value,
          year: yearRef.current.value,
          lastUpdated: serverTimestamp(),
        })
      }
      //Return to non-editing state
      console.log("saved!");
      setEditing(false);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        boxShadow: "1px 1px 1px 1px",
        p: 2,
        mb: 3,
        maxWidth: "500px",
      }}
      //   key={`educationItem_${index}`}
    >
      <Grid direction="row" container>
        <Typography
          align="left"
          gutterBottom
          fontWeight={"bold"}
          color="primary"
        >
          Education #{index + 1}
        </Typography>
        <Divider
          textAlign="left"
          variant="fullWidth"
          sx={{ width: "100%", mb: 2 }}
        />

        <Box
          sx={{
            "& .MuiTextField-root": {
              mb: 2,
            },
            mb: 0,
          }}
        >
          <TextField
            id="school"
            label="School/University Name"
            defaultValue={school}
            variant="standard"
            size="small"
            fullWidth
            disabled={!editing}
            inputRef={schoolRef}
            error={schoolError !== null}
            helperText={schoolError !== null ? schoolError : ""}
          />
          <TextField
            id="lastName"
            label="Degree/Certificate Achieved"
            defaultValue={degree}
            variant="standard"
            size="small"
            fullWidth
            disabled={!editing}
            inputRef={degreeRef}
            error={degreeError !== null}
            helperText={degreeError !== null ? degreeError : ""}
          />
          <TextField
            id="year"
            label="Graduation/Completion Year"
            defaultValue={year}
            variant="standard"
            size="small"
            fullWidth
            disabled={!editing}
            inputRef={yearRef}
            error={yearError !== null}
            helperText={yearError !== null ? yearError : ""}
          />
          <Box justifyContent="flex-end" display="flex" alignItems="center">
            <IconButton
              sx={{ mr: 2 }}
              size="small"
              onClick={() => handleDelete(index)}
              disabled={!editing}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              disabled={error !== null}
              sx={{ width: "70px", height: "30px" }}
              onClick={editing ? saveValues : editValues}
            >
              {editing ? "Save" : "Edit"}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default EducationItem;
