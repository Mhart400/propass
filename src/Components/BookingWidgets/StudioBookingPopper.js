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
import { useSnackbar } from 'notistack';

const numFormat = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
}

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDay();

function StudioBookingPopper({ studioInfo, handleClose }) {
  const [dateValue, setDateValue] = useState(null);
  const [startTime, setStartTime] = useState(new Date(year, month, day + 1, 8, 0));
  const [endTime, setEndTime] = useState(new Date(year, month, day + 1, 9, 0));
  const [totalPrice, setTotalPrice] = useState(studioInfo.rate);
  const [duration, setDuration] = useState();
  const [clientNames, setClientNames] = useState([
    { name: "", id: Math.random() },
  ]);

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
    });
    enqueueSnackbar(`Session Added to Cart!`, {variant: 'success'})
    handleClose()
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
    console.log(totalPrice)
  }, [startTime, endTime]);

  const addClient = () => {
    if (clientNames.length < 5) {
      setClientNames([...clientNames, { name: "", id: Math.random() }]);
    }
  };

  const handleUpdateClientList = (index, newValue) => {
    let newClientList = [...clientNames];
    newClientList[index]['name'] = newValue.target.value
    setClientNames([...newClientList]);
  };

  const removeClient = (index) => {
    let newClientList = [...clientNames];
    newClientList.splice(index, 1);
    setClientNames([...newClientList])
  };


  return (
    <Box
      sx={{
        minHeight: "300px",
        width: "300px",
        zIndex: 99,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "primary.light",
        borderRadius: "5px",
        overflowY: "auto",
      }}
    >
      <Card sx={{ width: "100%", height: "100%" }} elevation={4}>
        <Box
          sx={{
            position: "relative",
            height: "90px",
            width: "100%",
          }}
        >
          <Box
            height="100%"
            width="100%"
            sx={{
              backgroundImage: `url(${studioInfo.MainImage.url})`,
              backgroundSize: "cover",
            }}
          />
          <Box
            height="100%"
            width="100%"
            sx={{
              position: "absolute",
              top: 0,
              backgroundImage: `linear-gradient(to bottom,#000000,#00008b90)`,
              opacity: 0.95,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "15px",
              width: "100%",
              color: "white",
            }}
          >
            <Typography align="center" variant="subtitle1">
              Book a Session
            </Typography>
            <Typography align="center" variant="h5">
              {studioInfo.name}
            </Typography>
          </Box>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "200px",
          }}
        >
          <Box sx={{ my: 1, width: "250px", alignSelf: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: "250px", alignSelf: "center", my: 1 }}
                  />
                )}
                minDate={new Date()}
                maxDate={new Date(year + 1, month, day)}
                views={["month", "day"]}
                
              />
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                minutesStep={5}
                clearable
                renderInput={(params) => (
                  <TextField {...params} sx={{ my: 1, width: "250px" }} />
                )}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                minutesStep={5}
                minTime={new Date(startTime)}
                clearable
                renderInput={(params) => (
                  <TextField {...params} sx={{ my: 1, width: "250px" }} />
                )}
              />
            </LocalizationProvider>
          </Box>

          <Typography variant='overline' align='center' sx={{width: '250px', alignSelf: 'center'}}>Who are you bringing?</Typography>

          {clientNames &&
            clientNames.map((client, index) => {
              return (
                <TextField
                  label={`Client #${index + 1}`}
                  key={client.id}
                  id={client.id}
                  defaultValue={client["name"]}
                  onChange={(newValue) =>
                    handleUpdateClientList(index, newValue)
                  }
                  sx={{ width: "250px", alignSelf: "center", my: 0.5, p: 0 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        size="small"
                        onClick={() => removeClient(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ),
                  }}
                />
              );
            })}

          <Button onClick={addClient}>Add Client</Button>

          {isValid(startTime) && isValid(endTime) && (
            <Typography variant="h6" align="center">
              {duration}
            </Typography>
          )}

          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 1, width: "250px", alignSelf: "center" }}
          >
            ${Number(totalPrice).toLocaleString('en', numFormat)}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 3 }}
            onClick={handleAddToCart}
            disabled={
              !isValid(startTime) ||
              !isValid(endTime) ||
              !dateWithinYear(dateValue)
            }
          >
            Add to Cart
          </Button>
          <Button onClick={handleClose}>Cancel</Button> 
        </CardActions>
      </Card>
    </Box>
  );
}

export default StudioBookingPopper;
