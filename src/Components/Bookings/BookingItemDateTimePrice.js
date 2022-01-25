import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import SellIcon from '@mui/icons-material/Sell';

const fontSizes = {
  lg: "15px",
  md: "14px",
  sm: "13px",
  xs: "13px",
};

const iconSizes = {
  lg: "17px",
  md: "15px",
  sm: "15px",
  xs: "15px",
}

const localeStringOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};


function BookingItemDateTimePrice({ item }) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
        <CalendarTodayIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>
          {format(new Date(item.date.toDate()), "PPPP")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
        <AccessTimeIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>
          {format(new Date(item.startTime.toDate()), "p")} - {format(new Date(item.endTime.toDate()), "p")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
        <TimerIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>{item.duration}</Typography>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
        <SellIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>${Number(item.totalPrice).toLocaleString(
                "en",
                localeStringOptions
              )}</Typography>
      </Box>
    </>
  );
}

export default BookingItemDateTimePrice;
