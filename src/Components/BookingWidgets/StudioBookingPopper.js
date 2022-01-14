import React, { useState } from "react";
import {
  Box,
  Paper,
  Card,
  CardContent,
  Button,
  CardHeader,
  Typography,
  CardActions,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import OpenCloseHours from "../Calendar/OpenCloseHours";

function StudioBookingPopper({ studioInfo, handleClose }) {
  const [value, setValue] = useState(null);

  const [time, setTime] = useState();

  return (
    <Box sx={{ minHeight: "300px", width: "300px" }}>
      <Card sx={{ width: "100%", height: "100%" }} elevation={4}>
        <CardHeader
          avatar={
            <Box
              component="img"
              src={studioInfo.MainImage.url}
              height="70px"
              width="95px"
            />
          }
          title={<Typography variant="h6">Book a Session</Typography>}
          subheader={
            <Typography variant="subtitle1">{studioInfo.name}</Typography>
          }
          sx={{ backgroundColor: "background.default", p: 1 }}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "200px",
          }}
        >
          
            


          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "250px", alignSelf: "center" }}
                />
              )}
            />
          </LocalizationProvider>

          <TextField select sx={{width: '250px', alignSelf: 'center', my: 1}} />

        <Typography variant='h6' align='center' sx={{mt: 3, width: '250px', alignSelf: 'center'}}>$40</Typography>

        </CardContent>
        <CardActions sx={{ p: 2 }}>
          <Button variant="contained" sx={{ mr: 3 }}>
            Add to Cart
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default StudioBookingPopper;
