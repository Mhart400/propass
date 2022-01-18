import React from "react";
import { Box, Modal, Typography, Button, Divider } from "@mui/material";
import { useCart } from "../../Context/CartContext";
import CartItem from "./CartItem";
import CartTableHeaders from "./CartTableHeaders";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'

const modalStyle = {
  position: "absolute",
  top: "3%",
  left: "50%",
  transform: "translate(-49%)",
  width: { md: "88%", sm: "92%", xs: "94%" },
  maxWidth: '1100px',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: {xs: 1, sm: 2, md: 3, lg: 4},
};

const localeStringOptions = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }

function CartModal({ open, closeModal }) {
  const { cartItems, cartSummary, deleteItemFromCart } = useCart();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  let navigate = useNavigate()

  const handleDelete = (index) => {
    deleteItemFromCart(index)
    enqueueSnackbar('Session Removed from Cart', {variant: 'info'})
  }

  return (
    <Modal onClose={closeModal} open={open} sx={{ overflowY: "scroll", mb: 3}}>
      <Box sx={modalStyle}>
        <Box>
            <Typography align='center' variant='h4' sx={{mb: 2}}>My Cart</Typography>
        </Box>
        <CartTableHeaders />
        {cartItems.map((item, index) => {
          return (
            <CartItem
              key={`${item.studioId}_${item.startTime}`}
              item={item}
              handleDelete={() => handleDelete(index)}
            />
          );
        })}

        <Box sx={{ p: 2 }}>
          <Divider
            variant="fullWidth"
            sx={{ borderWidth: "2px", borderColor: "primary.main" }}
          />
          <Typography align="right" sx={{ width: "100%", my: 1 }}>
            Session Count:{" "}
            <strong>
              {Number(cartSummary.itemCount).toLocaleString("en")}
            </strong>
          </Typography>
          <Typography align="right" sx={{ width: "100%", my: 1 }}>
            Total Price:{" "}
            <strong>
              ${Number(cartSummary.totalPrice).toLocaleString("en", localeStringOptions)}
            </strong>
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{ borderWidth: "2px", borderColor: "primary.main" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" sx={{ mx: 2 }} onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ mx: 2 }} onClick={() => {navigate('/checkout'); closeModal()}}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CartModal;
