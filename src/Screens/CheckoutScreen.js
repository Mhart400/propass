import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Checkbox,
  Divider,
} from "@mui/material";
import Layout from "../Components/Layout/Layout";
import PageTitle from "../Components/Layout/PageTitle";
import { useCart } from "../Context/CartContext";
import CartTableHeaders from "../Components/Cart/CartTableHeaders";
import CartItem from "../Components/Cart/CartItem";
import { useSnackbar } from "notistack";
import TermsConditionsBox from "../Components/Cart/TermsConditionsBox";
import useCheckout from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";

const localeStringOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function CheckoutScreen() {
  const { cartItems, deleteItemFromCart, cartSummary, clearCart } = useCart();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [confirmed, setConfirmed] = useState(false);
  const { saveCartItemsToFirestore } = useCheckout();
  const navigate = useNavigate();

  const handleDelete = (index) => {
    deleteItemFromCart(index);
    enqueueSnackbar("Session Removed from Cart", { variant: "info" });
  };

  const handleCheckbox = (e) => {
    setConfirmed(e.target.checked);
  };

  // Function to checkout (save to firestore, remove from CartContext, Process Payment *future*
  const handleCheckout = () => {
    try {
      // Step 1. Save to FireStore
      saveCartItemsToFirestore();
      // Step 2. Display Success Message
      enqueueSnackbar(`${cartItems.length} sessions successfully booked!`, {
        variant: "success",
      });
      // Step 3. Clear cartItems and navigate to Bookings Screen
      clearCart();
      navigate('/pro/bookings');
    } catch (error) {
      enqueueSnackbar("Error. Please Try Again", { variant: "error" });
    }
  };

  return (
    <Layout>
      <PageTitle>Checkout</PageTitle>

      <Box>
        <CartTableHeaders />
        {cartItems && cartItems.map((item, index) => {
          return (
            <CartItem
              key={`${item.studioId}_${item.startTime}`}
              item={item}
              handleDelete={() => handleDelete(index)}
            />
          );
        })}
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider
          variant="fullWidth"
          sx={{ borderWidth: "2px", borderColor: "primary.main" }}
        />
        <Typography align="right" sx={{ width: "100%", my: 1 }}>
          Session Count:{" "}
          <strong>{Number(cartSummary.itemCount).toLocaleString("en")}</strong>
        </Typography>
        <Typography align="right" sx={{ width: "100%", my: 1 }}>
          Total Price:{" "}
          <strong>
            $
            {Number(cartSummary.totalPrice).toLocaleString(
              "en",
              localeStringOptions
            )}
          </strong>
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{ borderWidth: "2px", borderColor: "primary.main" }}
        />
      </Box>

      <Box sx={{ mt: 3, pb: 3 }}>
        <Typography variant="h6" align="center">
          Confirm & Pay
        </Typography>
        <TermsConditionsBox />
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <Checkbox checked={confirmed} onChange={handleCheckbox} />
          <Typography>I agree to the terms & conditions</Typography>
        </Box>
        <Button
          variant="contained"
          disabled={!confirmed}
          onClick={handleCheckout}
        >
          Pay & Book!
        </Button>
      </Box>
    </Layout>
  );
}

export default CheckoutScreen;
