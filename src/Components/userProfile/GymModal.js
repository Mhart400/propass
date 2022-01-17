import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button, } from "@mui/material";
import useFirestore from "../../hooks/useFirestore";
import { useAuth } from "../../Context/AuthContext";
import StudioDetailsTabs from "../Tabs/StudioDetailsTabs";

const modalStyle = {
  position: "absolute",
  top: "3%",
  left: "50%",
  transform: "translate(-50%)",
  width: { lg: 1100, md: '85%', sm: '90%', xs: '90%' },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: {md: 3, sm: 2, xs: 1.5},
  // overflowY: 'scroll',
};

function GymModal({ closeModal, studioId, open }) {
  const { userProfile } = useAuth();
  const { retrieveStudioData_allNested } = useFirestore();
  const [studioDetails, setStudioDetails] = useState();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    retrieveStudioData_allNested(studioId, setStudioDetails);
  }, [studioId, open]);

  return (
    <Modal
      onClose={closeModal}
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{overflowY: 'scroll'}}
    >
      <Box sx={modalStyle}>
      {studioDetails && (
        <Box key={studioId}>
          <Typography variant="h4" align='center' id="child-modal-title">
            {studioDetails.name}
          </Typography>
          <Typography align='center' id="child-modal-description">
            {studioDetails.address}, {studioDetails.city} {studioDetails.state}
          </Typography>
          <StudioDetailsTabs studioInfo={studioDetails} />
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}} >
          <Button variant="contained" onClick={closeModal} sx={{mr: {lg: 10, md: 5, sm: 3}}} >
            Close
          </Button>
          </Box>
        </Box>
      )}
      </Box>
    </Modal>
  );
}

export default GymModal;
