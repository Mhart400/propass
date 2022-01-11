import React, { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { Box } from "@mui/material";
import useFirestore from "../../hooks/useFirestore";
import { useAuth } from "../../Context/AuthContext";

const ImageProgressBar = ({ uploadFile, setUploadFile, collectionName, replace }) => {
  const { progress, url, uploadError } = useStorage(uploadFile, collectionName, replace); //true to overwrite
  const { userProfile} = useAuth()
  const {saveUserData_Nested} = useFirestore()

  useEffect(() => {
    if (url) {
      saveUserData_Nested(userProfile.id, {avatarUrl: url})
      setUploadFile();
    }
  }, [url, setUploadFile]);

  
  return (
    <Box sx={{ width: "100%" }}>
      Progress: {progress}%
      {uploadError && <p>{uploadError}</p>}
    </Box>
  );
};
 
export default ImageProgressBar;
