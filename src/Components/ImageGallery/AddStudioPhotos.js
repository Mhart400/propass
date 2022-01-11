import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Input,
  Divider,
} from "@mui/material";
import ImageProgressBar from "./ImageProgressBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function AddStudioPhotos({ imageList, setImageList, mainImage, setMainImage }) {
  const [file, setFile] = useState();

  const allowedTypes = ["image/png", "image/jpeg"];

  const selectMainImage = (e) => {
    let selected = Array.from(e.target.files);
    Promise.all(
      selected.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      (image) => {
        /* Once all promises are resolved, update state with image URI array */
        setMainImage({ dataUrl: image, file: e.target.files[0] });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const selectImages = (e) => {
    let selected = Array.from(e.target.files);
    Promise.all(
      selected.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      (images) => {
        /* Once all promises are resolved, update state with image URI array */
        let allImages = []
        images.forEach((img, index) => {
          allImages = [...allImages, {file: e.target.files[index], dataUrl: img}]
        })
        setImageList([...imageList, ...allImages]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const deleteImage = (index) => {
    let newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
  };

  const resetImageList = () => {
    setImageList([]);
  };

  return (
    <Box sx={{ p: 2, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
          Main Image
        </Typography>
        <Box
          sx={{
            width: "190px",
            height: "130px",
            borderColor: "primary.main",
            borderWidth: "3px",
            borderStyle: "solid",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={mainImage['dataUrl']}
            sx={{ position: "absolute" }}
            height="100%"
            width="100%"
          />
          <IconButton component="label">
            <input hidden multiple type="file" onChange={selectMainImage} />
            <AddCircleIcon sx={{ fontSize: 30, color: "secondary.main" }} />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
            All Studio Images
          </Typography>
          <IconButton component="label">
            <input hidden multiple type="file" onChange={selectImages} />
            <AddCircleIcon sx={{ fontSize: 30, color: "primary.main" }} />
          </IconButton>
          <IconButton sx={{ ml: 2 }} onClick={resetImageList}>
            <RestartAltIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: { sm: "450px", xs: "400px" },
            minHeight: "240px",
            borderColor: "primary.main",
            borderWidth: "3px",
            borderStyle: "solid",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {imageList &&
            imageList.length > 0 &&
            imageList.map((image, index) => {
              return (
                <Box sx={{ position: "relative" }} key={`${image}_${index}`}>
                  <Box
                    component={"img"}
                    src={image['dataUrl']}
                    height={{ sm: "118px", xs: "118px" }}
                    width={{ sm: "150px", xs: "132px" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => deleteImage(index)}
                    sx={{
                      position: "absolute",
                      color: "background.default",
                      backgroundColor: "primary.main",
                      opacity: "65%",
                      zIndex: 10,
                      right: "5px",
                      top: "5px",
                      "&: hover": {
                        backgroundColor: "secondary.main",
                        opacity: "100%",
                      },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Box>
              );
            })}
        </Box>
      </Box>

      
    </Box>
  );
}

export default AddStudioPhotos;
