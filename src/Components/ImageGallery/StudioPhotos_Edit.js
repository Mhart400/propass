import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Input,
  Divider,
} from "@mui/material";
import useStorage_studios from "../../hooks/useStorage_studios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useFirestore from "../../hooks/useFirestore";

function StudioPhotos_Edit({ studioInfo }) {
  const { uploadStudioDoc, deleteStudioDocsFromStorage } = useStorage_studios();
  const { saveStudioData_Nested} = useFirestore()
  const [studioImages, setStudioImages] = useState(studioInfo.StudioImages)
  const [mainImage, setMainImage] = useState(studioInfo.MainImage)
  const [editing, setEditing] = useState(false)

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
        setMainImage({ url: image, file: e.target.files[0] });
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
          allImages = [...allImages, {file: e.target.files[index], url: img}]
        })
        setStudioImages([...studioImages, ...allImages]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const deleteImage = (index) => {
    let newImageList = [...studioImages];
    newImageList.splice(index, 1);
    setStudioImages(newImageList);
  };

  const resetImageList = () => {
    setStudioImages([]);
  };

  const editValues = () => {
      setEditing(true)
  }
  
  async function saveValues() {
      setEditing(false)
      
      //Add main image to Storage & Firestore
      console.log('Uploading MainImage')
      uploadStudioDoc(studioInfo.id, "MainImage", mainImage["file"], true);
      
      //Delete all StudioImages from Storage
      console.log('Deleting docs from storage (StudioImages)')
      deleteStudioDocsFromStorage(studioInfo.id, "StudioImages", null)
    
      // Delete all StudioImages from Firestore
      saveStudioData_Nested(studioInfo.id, {StudioImages: studioImages})

      // Add all images in imgeList to Storage & Firestore
      console.log('Uploading studioImages to Storage')
      studioImages.forEach(image => {
        console.log('Saving image to firestore!!!')
        uploadStudioDoc(studioInfo.id, "StudioImages", image['file'], false);
      })
  }

  

  return (
    <Box sx={{ mt: 1 }}>
      <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
              Studio Photos
            </Typography>
            <IconButton
              onClick={editing ? saveValues : editValues}
              size="small"
              sx={{ color: "text.primary" }}
            >
              {editing ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Box>
            <Divider sx={{width: '100%'}} />
          
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
            src={mainImage['url']}
            sx={{ position: "absolute" }}
            height="100%"
            width="100%"
          />
          <IconButton component="label" disabled={!editing}>
            <input hidden multiple type="file" onChange={selectMainImage} />
            <AddCircleIcon sx={{ fontSize: 30, color: editing ? "secondary.main" : 'Background.default' }} />
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
          <IconButton component="label" disabled={!editing} >
            <input hidden multiple type="file" onChange={selectImages} />
            <AddCircleIcon sx={{ fontSize: 30, color: editing ? "primary.main" : 'Background.default' }} />
          </IconButton>
          <IconButton sx={{ ml: 2 }} onClick={resetImageList} disabled={!editing} >
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
          {studioImages &&
            studioImages.length > 0 &&
            studioImages.map((image, index) => {
              return (
                <Box sx={{ position: "relative" }} key={`${image}_${index}`}>
                  <Box
                    component={"img"}
                    src={image['url']}
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
                    disabled={!editing}
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

export default StudioPhotos_Edit;
