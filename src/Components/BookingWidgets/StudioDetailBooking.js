import React from "react";
import { Box, Button, Typography, Popper, Paper, AppBar } from "@mui/material";
import { useParams } from "react-router-dom";
import StudioBookingPopper from "./StudioBookingPopper";

function StudioDetailBooking({ studioInfo }) {
  const { studioId } = useParams();

  // Handle popper behavior
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleBookingPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "40px",
        borderLeftColor: "text.secondary",
        borderLeftWidth: { md: "1px", sm: 0, xs: 0 },
        borderLeftStyle: "solid",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      >
      <Box
        component={Paper}
        elevation={3}
        
        sx={{
          boxShadow: "5px 5px 5px white",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 0,
          left: 0,
          backgroundColor: "primary.dark",
          opacity: "99%",
          boxShadow: '0px -2px 5px 1px #b2bcca20',
        }}
      />

      <Typography
        sx={{
          mx: { lg: 3, sm: 2, xs: 1 },
          color: "background.default",
          zIndex: 1,
          fontSize: { lg: "20px", xs: "18px" },
          fontWeight: "bold",
        }}
      >
        ${studioInfo.rate}/hour
      </Typography>

      <Button
        variant="contained"
        align="center"
        size="large"
        color="secondary"
        sx={{
          borderRadius: "15px",
          px: { lg: 4, md: 4, sm: 2, xs: 1 },
          mx: { lg: 3, md: 2, sm: 1, xs: 1 },
          lineHeight: 1.5,
          width: { sm: "180px", xs: "110px" },
        }}
        onClick={handleBookingPopper}
        aria-describedby={id}
      >
        Book Session
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        id={id}
        placement="top"
        modifiers={[
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              // tether: true,
              rootBoundary: "document",
            },
          },
        ]}
      >
        <StudioBookingPopper
          studioInfo={studioInfo}
          handleClose={handleBookingPopper}
        />
      </Popper>

      <Button
        align="center"
        variant="outlined"
        size="large"
        sx={{
          color: "background.default",
          borderColor: "background.default",
          borderRadius: "15px",
          px: { lg: 3, md: 2, sm: 1.5, xs: 1 },
          mx: { lg: 3, md: 2, sm: 1, xs: 1 },
          lineHeight: 1.5,
          width: { sm: "180px", xs: "110px" },
        }}
        onClick={() => console.log(studioId)}
      >
        Message Owner
      </Button>
    </Box>
  );
}

export default StudioDetailBooking;
