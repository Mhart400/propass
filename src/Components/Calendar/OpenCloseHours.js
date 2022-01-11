import React, { useState } from "react";
import {
  Box,
  InputLabel,
  FormControl,
  Typography,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";

function OpenCloseHours({ index, day, setDayTimes, editing, initialOpenTime, initialCloseTime }) {
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

  const [openTime, setOpenTime] = React.useState(initialOpenTime);
  const [closeTime, setCloseTime] = React.useState(initialCloseTime);

  const changeOpenTime = (event) => {
    setOpenTime(event.target.value);
    setDayTimes({
        index: index,
        day: day,
        field: 'openTime',
        value: event.target.value,
    })
  };

  const changeCloseTime = (event) => {
    setCloseTime(event.target.value);
    setDayTimes({
        index: index,
        day: day,
        field: 'closeTime',
        value: event.target.value,
    })
  };

  return (
    <Box>
      <Grid container direction="coulmn" sx={{ alignItems: "center", my: 1 }}>
        <Grid item xs={4}>
          <Typography variant="subtitle2">{day}</Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: "40px" }}>
            <Select
              labelId={`${day}_openTime`}
              id={`${day}openTime`}
              value={openTime}
              disabled={!editing}
              onChange={changeOpenTime}
              size="small"
              sx={{ typography: "subtitle2", }}
              MenuProps={{ sx: { maxHeight: "300px" } }}
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
        </Grid>
        <Grid item xs={4}>
        <FormControl sx={{ minWidth: "40px" }}>
            <Select
              labelId={`${day}_closeTime`}
              id={`${day}closeTime`}
              value={closeTime}
              disabled={!editing}
              onChange={changeCloseTime}
              size="small"
              sx={{ typography: "subtitle2" }}
              MenuProps={{ sx: { maxHeight: "300px" } }}
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default OpenCloseHours;
