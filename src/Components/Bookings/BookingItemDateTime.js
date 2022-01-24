import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";

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

function BookingItemDateTime({ item }) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mt: {xs: 1, sm: 0} }}>
        <CalendarTodayIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>
          {format(new Date(item.date.toDate()), "PPPP")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccessTimeIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>
          {format(new Date(item.startTime.toDate()), "p")} - {format(new Date(item.endTime.toDate()), "p")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TimerIcon sx={{ mr: 1, fontSize: iconSizes }} />
        <Typography sx={{ fontSize: fontSizes }}>{item.duration}</Typography>
      </Box>
    </>
  );
}

export default BookingItemDateTime;
