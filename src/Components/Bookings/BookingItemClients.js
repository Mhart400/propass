import React from "react";
import { Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

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

function BookingItemClients({ item }) {
  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <PeopleIcon sx={{fontSize: iconSizes}} />
          <Typography sx={{ fontSize: fontSizes, ml: 1, fontWeight: 'bold' }}>Clients: </Typography>
        </Box>
        {item.clientList.map((client) => {
          return (
            <Box component={"li"} sx={{ fontSize: fontSizes, my: 0.25, pl: 2 }} key={client.id}>
              {client.name}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default BookingItemClients;
