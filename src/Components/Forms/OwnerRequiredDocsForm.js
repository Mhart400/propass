import React, { useState, useRef, useEffect } from "react";
import { Grid, Box, IconButton, Divider, Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PhotoId from "./PhotoId";
import InsuranceProof from "./InsuranceProof";
import CprProof from "./CprProof";


function OwnerRequiredDocsForm() {
  const { userProfile, getProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    editing ? setEditing(false) : setEditing(true)
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
              Photo Id, Insurance, and CPR
            </Typography>
            <IconButton onClick={toggleEditing} sx={{ color: "text.primary" }} >{editing ? <LockOpenIcon /> : <LockIcon />}</IconButton>
            
          </Box>
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ width: "100%", backgroundColor: "text.primary" }}
        />
      </Grid>

      {/* Form Body */}
      <Box sx={{ width: "100%", position: "relative" }}>
        <Typography variant="overline">*All Documents are Required*</Typography>
        
        <InsuranceProof editing={editing} />
        
      </Box>
    </Box>
  );
}

export default OwnerRequiredDocsForm;
