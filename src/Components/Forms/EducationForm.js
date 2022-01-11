import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Divider,
  Typography,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import states from "../../Data/states";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PageLoading from "../PageLoading";
import {
  collection,
  updateDoc,
  where,
  query,
  getDocs,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import EducationItem from "./EducationItem";
import useFirestore from "../../hooks/useFirestore"; 

function EducationForm() {
  const {userProfile } = useAuth()


  const { deleteUserDoc, retrieveDocs } = useFirestore()
  const [educationItems, setEducationItems] = useState();
  
  useEffect(() => {
      // setEducationItems(educationDocs)
      retrieveDocs(userProfile.id, 'Education', setEducationItems)
  },[])

  const handleDelete = (val) => {
    console.log(`Deleting Index ${val}`);
    //Delete from Firestore
    const itemObj = educationItems[val]
    console.log(itemObj)
    deleteUserDoc(userProfile.id, 'Education', itemObj['id'])
    //Delete from State
    let newItems = educationItems
    newItems.splice(val, 1)
    setEducationItems([...newItems]);
  };

  const addNew = () => {
    setEducationItems([...educationItems, {
        school: '',
        degree: '',
        year: '',
        id: ''
    }])
    
  }

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
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
              My Education
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
        <Grid container direction="column">
          {educationItems && educationItems.map((item, index) => {
          return (
              <EducationItem
              index={index}
              key={item['id']}
              id={item['id']}
              degree={item["degree"]}
              school={item["school"]}
              year={item["year"]}
              handleDelete={handleDelete}
              />
                )
            })}

          <Button sx={{ width: "90px", mt: 4 }} variant="outlined" size="small" onClick={addNew}>
            Add New
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default EducationForm;
