import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Input,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import useFirestore from "../../hooks/useFirestore";
import CancelIcon from "@mui/icons-material/Cancel";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageProgressBar from "../ImageGallery/ImageProgressBar";
import { useAuth } from "../../Context/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function PhotoId({ editing }) {
  const { retrieveDocs } = useFirestore();
  const { userProfile } = useAuth();

  const [file, setFile] = useState();
  const [currentFile, setCurrentFile] = useState();
  const [uploadFile, setUploadFile] = useState(); // Use this when user clicks 'upload'
  const [error, setError] = useState(null);
  const [isValidFile, setIsValidFile] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef();

  const resetFile = () => {
    cancelRef.current.value = null;
    setFile();
    setError(null);
    setIsValidFile(false);
  };

  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

  const defaultPdfImage =
    "https://www.conquestgraphics.com/images/default-source/Blog/pdf-icon.png?sfvrsn=a13018d_2";

  // if a file has been saved to Stoage, the download URL is available in firestore

  const selectFile = (e) => {
    e.preventDefault();
    const selected = e.target.files[0];
    console.log(selected);
    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setError(null);
      setIsValidFile(true);
    } else {
      setFile();
      setError("Please select a valid file (.png, .jpg, .jpeg, .pdf)");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (allowedTypes.includes(file.type)) {
      console.log("Attempting to upload");
      setUploadFile(file);
      resetFile();
    }
  };

  const getThumbnailUrl = () => {
    try {
      const fileName = currentFile[0].filename;
      const fileType = fileName.split(".")[1];
      const allowedTypes = ["png", "jpg", "jpeg", "pdf"];
      if (allowedTypes.includes(fileType)) {
        setThumbnailUrl(currentFile[0]["url"]);
      } else {
        setThumbnailUrl(defaultPdfImage);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    retrieveDocs(userProfile.id, 'PhotoId', setCurrentFile)
    getThumbnailUrl();
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Photo ID*
      </Typography>
      <Divider variant="fullwidth" sx={{ mb: 2 }} />
      <Typography variant="body1">
        Please submit a photo or scan of a Photo ID.
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Input
          type="file"
          onChange={selectFile}
          sx={{ my: 2, width: "400px", maxWidth: "400px" }}
          disabled={!editing}
          inputRef={cancelRef}
          inputProps={{ sx: { typography: "body1" } }}
        />
        <IconButton onClick={resetFile} disabled={!editing}>
          <CancelIcon />
        </IconButton>
        <Button
          size="small"
          variant="outlined"
          disabled={!editing || isValidFile === false}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Box>
      {error !== null && (
        <Typography variant="overline" color="error" sx={{ display: "block" }}>
          {error}
        </Typography>
      )}
      {currentFile && currentFile.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={thumbnailUrl ? thumbnailUrl : currentFile[0]["url"]}
            height="50px"
            width="50px"
            sx={{ mr: 2 }}
          />
          <Typography variant="body2" sx={{ maxWidth: "400px", mr: 1 }}>
            {currentFile[0].filename}
          </Typography>
          <IconButton size="small" href={currentFile[0].url} target="_blank">
            <OpenInNewIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          
        </Box>
      )}
      <Typography />

      {uploadFile && (
        <Typography>
          Progress:
          <ImageProgressBar
            uploadFile={uploadFile}
            setUploadFile={setUploadFile}
            collectionName={"PhotoId"}
            replace={true}
          />
        </Typography>
      )}
    </Box>
  );
}

export default PhotoId;
