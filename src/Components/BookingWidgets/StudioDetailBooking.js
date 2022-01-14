import React from "react";
import { Box, Button, Typography, Popper } from "@mui/material";
import { useParams } from "react-router-dom";
import StudioBookingPopper from "./StudioBookingPopper";

function StudioDetailBooking({studioInfo}) {
  const { studioId } = useParams();

  // Handle popper behavior
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleBookingPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;



  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        borderLeftColor: "text.secondary",
        borderLeftWidth: { md: "1px", sm: 0, xs: 0 },
        borderLeftStyle: "solid",
        // display: 'flex',
        
      }}
    >
      <Typography variant="h4" align="center" sx={{width: '100%'}}>
        ${studioInfo.rate}/hour
      </Typography>
      <Box sx={{ display: "flex", flexDirection: {md: 'column', sm :'row'}, alignItems: "center" }}>
        <Box
          sx={{
            width: { md: "100%", sm: "100%", xs: "50%" },
            my: 3,
            mr: 1,
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            align="center"
            size="large"
            sx={{ borderRadius: "15px", px: {md: 4, sm: 2}, py: {md: 2, sm: 1}, flexWrap: "nowrap" }}
            onClick={handleBookingPopper}
            aria-describedby={id} 
          >
            Book Session
          </Button>
        </Box>
        <Popper open={open} anchorEl={anchorEl} id={id} placement='auto-start'>
          <StudioBookingPopper studioInfo={studioInfo} handleClose={handleBookingPopper} />
        </Popper>
        <Box
          sx={{
            width: { md: "100%", sm: "100%", xs: "50%" },
            my: 1,
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <Button
            align="center"
            size="large"
            onClick={() => console.log(studioId)}
          >
            Message Owner
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default StudioDetailBooking;
