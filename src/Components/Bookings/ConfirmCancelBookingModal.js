import React, { useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import useFirestore_Bookings from "../../hooks/useFirestore_Bookings";
import BookingItemDateTimePrice from "./BookingItemDateTimePrice";


const modalStyle = {
  position: "absolute",
  top: "3%",
  left: "50%",
  transform: "translate(-49%)",
  width: { md: "88%", sm: "92%", xs: "94%" },
  maxWidth: "430px",
  minHeight: "300px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: { xs: 1, sm: 2, md: 3, lg: 4 },
};

function ConfirmCancelBookingModal({ open, closeModal, item }) {

  return (
    <Modal onClose={closeModal} open={open} sx={{ overflowY: "scroll", mb: 3 }}>
      <Box sx={modalStyle}>
        <Typography variant="h6">
          Are you sure you want to cancel the Session?
        </Typography>
        <Box sx={{ my: 2, minHeight: "200px" }}>
          {item && (
            <>
              <Typography variant="subtitle1">{item.studioName}</Typography>
              <BookingItemDateTimePrice item={item} />
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" sx={{ mx: 1 }} onClick={() => closeModal(false)}>
            Keep Session
          </Button>
          <Button variant="contained" color="error" sx={{ mx: 1 }} onClick={() => closeModal(true)} >
            Cancel Session
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmCancelBookingModal;
