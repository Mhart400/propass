import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button, Tab, Tabs } from "@mui/material";
import AddNewGymStepper from "./AddNewGymStepper";

const modalStyle = {
  position: "absolute",
  top: "3%",
  left: "50%",
  transform: "translate(-50%)",
  width: { md: 600, sm: 500, xs: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  
};

function AddNewGymModal({ closeModal, open }) {
  const [isNew, setIsNew] = useState(false);
  

  
  
  return (
    <Modal
      onClose={closeModal}
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{overflowY: 'scroll'}}
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{mb: 3}} id="child-modal-title">
          Add New Studio
        </Typography>

        <AddNewGymStepper closeModal={closeModal} />

        
      </Box>
    </Modal>
  );
}

export default AddNewGymModal;
