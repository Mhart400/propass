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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import OpenCloseHours from "../Calendar/OpenCloseHours";

function StudioBookingPopper({ studioInfo, handleClose }) {
  const [value, setValue] = useState(null);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const hourOptions = [
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];
  const minOptions = ["00", "30"];
  const amOptions = ["AM", "PM"];

  let times = [];
  amOptions.map((am) => {
    hourOptions.map((hour) => {
      times.push(`${hour}:00 ${am}`);
      times.push(`${hour}:30 ${am}`);
    });
  });

  const changeStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const changeEndTime = (event) => {
    setEndTime(event.target.value);
  };

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
          <Box sx={{ my: 1, width: '250px', alignSelf: 'center' }}>
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
          </Box>

          <FormControl sx={{ width: "250px", alignSelf: "center", my: 1 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Start Time
            </InputLabel>
            <Select
              value={startTime}
              onChange={changeStartTime}
              size="small"
              sx={{ typography: "subtitle2", height: "55px" }}
              MenuProps={{ sx: { maxHeight: "300px" } }}
              label="Select Time"
            >
              {times.map((hour) => {
                return (
                  <MenuItem sx={{ typography: "subtitle2" }} value={hour}>
                    {hour}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "250px", alignSelf: "center", my: 1 }}>
            <InputLabel id="demo-controlled-open-select-label">
              End Time
            </InputLabel>
            <Select
              value={endTime}
              onChange={changeEndTime}
              size="small"
              sx={{ typography: "subtitle2", height: "55px" }}
              MenuProps={{ sx: { maxHeight: "300px" } }}
              label="Select Time"
            >
              {times.map((hour) => {
                return (
                  <MenuItem sx={{ typography: "subtitle2" }} value={hour}>
                    {hour}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 3, width: "250px", alignSelf: "center" }}
          >
            ${studioInfo.rate}
          </Typography>
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
