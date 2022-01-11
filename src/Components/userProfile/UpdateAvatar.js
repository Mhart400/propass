import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  IconButton,
  Input,
  InputLabel,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import UserAvatar from "./UserAvatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ImageProgressBar from "../ImageGallery/ImageProgressBar";

function UpdateAvatar() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("Select an Image");
  const allowedTypes = ["image/png", "image/jpeg"];

  const selectFile = (e) => {
    const selected = e.target.files[0];
    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select an image file (.png or .jpeg)");
    }
  };

  const fileRef = useRef();
  const resetFile = () => {
    fileRef.current.value = null;
    setError("Select an Image");
    setFile(null);
  };

  const [uploadFile, setUploadFile] = useState();

  function uploadImage() {
    setUploadFile(file);
    resetFile();
  }

  return (
    <Box sx={{ mb: 5, overflowX: "hidden" }}>
      <Grid container direction="column" sx={{ width: "100%", padding: "5px" }}>
        <Grid diretion="row">
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
                Profile Picture
              </Typography>
            </Box>
          </Box>
          <Divider
            variant="fullWidth"
            sx={{ width: "100%", backgroundColor: "text.primary" }}
          />
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "block", width: "100%", position: "relative" }}>
            <UserAvatar height={150} width={150} sx={{ padding: "10px" }} />
            <IconButton
              component="label"
              color="primary"
              sx={{ position: "absolute", top: "130px", right: '39%' }}
            >
              <AddCircleIcon sx={{ fontSize: "30px", backgroundColor: 'white', borderRadius: '50px' }} />
              <input
                type="file"
                hidden
                onChange={selectFile}
                ref={fileRef}
                id="inputFile"
              />
            </IconButton>
          </Box>

          <Typography
            variant="overline"
            sx={{
          
              color: file
                ? "success.main"
                : error
                ? "error.main"
                : "primary.main",
            }}
          >
            {file ? file.name : error ? error : "Select an Image"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "10px",
          }}
        >
          <IconButton size="small" onClick={resetFile} sx={{ mx: 1 }}>
            <ReplayIcon />
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            disabled={error !== null}
            onClick={uploadImage}
            sx={{ mx: 1 }}
          >
            Update
          </Button>
        </Box>
        {uploadFile && (
          <ImageProgressBar
            uploadFile={uploadFile}
            setUploadFile={setUploadFile}
            collectionName={"Avatar"}
            replace={true}
          />
        )}
      </Grid>

      <Grid item sx={{ width: "100%" }}>
      </Grid>
    </Box>
  );
}

export default UpdateAvatar;
