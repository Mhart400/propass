import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { formatDistanceStrict, isValid } from "date-fns";
import { useCart } from "../../Context/CartContext";
import { useSnackbar } from "notistack";
import { useAuth } from "../../Context/AuthContext";

const numFormat = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDay();

function StudioBookingModal({ studioInfo, handleClose }) {
  const [dateValue, setDateValue] = useState(null);
  const [startTime, setStartTime] = useState(
    new Date(year, month, day + 1, 8, 0)
  );
  const [endTime, setEndTime] = useState(new Date(year, month, day + 1, 9, 0));
  const [totalPrice, setTotalPrice] = useState(studioInfo.rate);
  const [duration, setDuration] = useState();
  const [clientNames, setClientNames] = useState([
    { name: "", id: Math.random() },
  ]);
  const { userProfile } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart({
      date: dateValue,
      startTime: startTime,
      endTime: endTime,
      studioId: studioInfo.id,
      studioName: studioInfo.name,
      studioAddress: studioInfo.address,
      studioCity: studioInfo.city,
      studioState: studioInfo.state,
      studioZip: studioInfo.zip,
      studioPhone: studioInfo.phone,
      duration: duration,
      totalPrice: totalPrice,
      clientList: clientNames,
      mainImage: studioInfo.MainImage.url,
      ownerId: studioInfo.ownerId,
      proAvatarUrl: userProfile.avatarUrl,
      proFirstName: userProfile.firstName,
      proLastName: userProfile.lastName,
      proEmail: userProfile.email,
    });
    enqueueSnackbar(`Session Added to Cart!`, { variant: "success" });
    handleClose();
  };

  const dateWithinYear = (dateInput) => {
    return (
      dateInput >= new Date() && dateValue <= new Date(year + 1, month, day)
    );
  };

  useEffect(() => {
    setDuration();
    if (isValid(startTime) && isValid(endTime)) {
      const newValue = formatDistanceStrict(
        new Date(endTime),
        new Date(startTime),
        { unit: "minute" }
      );
      setDuration(newValue);
      setTotalPrice((parseInt(newValue, 10) * studioInfo.rate) / 60);
    }
    console.log(totalPrice);
  }, [startTime, endTime]);

  const addClient = () => {
    if (clientNames.length < 5) {
      setClientNames([...clientNames, { name: "", id: Math.random() }]);
    }
  };

  const handleUpdateClientList = (index, newValue) => {
    let newClientList = [...clientNames];
    newClientList[index]["name"] = newValue.target.value;
    setClientNames([...newClientList]);
  };

  const removeClient = (index) => {
    let newClientList = [...clientNames];
    newClientList.splice(index, 1);
    setClientNames([...newClientList]);
  };

  return <h1>ok</h1>;
}

export default StudioBookingModal;
