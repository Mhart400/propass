import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Divider,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAuth } from "../../Context/AuthContext";
import useFirestore from "../../hooks/useFirestore";

function SpecialtiesForm() {
  const { retrieveUserData_Nested, saveUserData_Nested } = useFirestore();
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const newItemRef = useRef();

  const [specialList, setSpecialList] = useState([]);

  useEffect(() => {
    retrieveUserData_Nested(userProfile.id, 'specialties', setSpecialList)
  }, []);

  const clearField = () => {
    newItemRef.current.value = "";
    newItemRef.current.focus();
  };

  const handleDelete = (name, index) => {
    console.log(`Deleting specialty: ${name}`);
    let newList = specialList;
    newList.splice(index, 1);
    saveUserData_Nested(userProfile.id, {specialties: [...newList]})
    setSpecialList([...newList]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(specialList)
    if (specialList && specialList.length > 0) {
      setSpecialList([...specialList, newItemRef.current.value])
      saveUserData_Nested(userProfile.id, {specialties: [...specialList, newItemRef.current.value]})
    } else {
      setSpecialList([newItemRef.current.value])
      saveUserData_Nested(userProfile.id, {specialties: [newItemRef.current.value]})
    }

    // Save to firestore
    clearField();
  };

  const SpecialItem = ({ id, value, key, index }) => (
    <>
      <ListItem
        key={key}
        id={id}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "500px",
          "&:hover": { backgroundColor: "background.default" },
        }}
        secondaryAction={
          <IconButton
            edge="end"
            disabled={!editing}
            aria-label="delete"
            onClick={() => {
              handleDelete(id, index);
            }}
            sx={{ visibility: editing ? "visible" : "hidden" }}
          >
            <DeleteIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        }
      >
        <ListItemText>
          <Chip
            label={value}
            size="large"
            color="primary"
            sx={{ fontSize: "18px" }}
          />
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  );

  const toggleEditing = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  const handleEnter = (e) => {
    e.key === "Enter" && handleAdd(e);
  };

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
              Specialties
            </Typography>
            <IconButton onClick={toggleEditing} sx={{ color: "text.primary" }}>
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
      <Box sx={{ width: "100%", position: "relative" }}>
        <Grid container direction="row" sx={{ mb: 7 }}>
          <Grid
            container
            sx={{
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mb: 4,
            }}
          >
            {/* <form > */}
            <TextField
              id="newItem"
              label="Specialty"
              // defaultValue={school}
              variant="standard"
              size="small"
              disabled={!editing}
              onKeyDown={handleEnter}
              inputRef={newItemRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={clearField}>
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, display: "inline-flex", mr: 1 }}
            />
            <Button
              sx={{ width: "70px", display: "inline" }}
              variant="contained"
              disabled={!editing}
              onClick={handleAdd}
            >
              Add
            </Button>
            {/* </form> */}
          </Grid>
          <Divider sx={{ width: "100%", mb: 3 }} />
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>

            <Box>
              <List>
                {specialList && specialList.length > 0 &&
                  specialList.map((name, index) => {
                    return (
                      <SpecialItem
                        id={name}
                        value={name}
                        key={`${name}_${index}`}
                        index={index}
                      />
                    );
                  })}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SpecialtiesForm;
