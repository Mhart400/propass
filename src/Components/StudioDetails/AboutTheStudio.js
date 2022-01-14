import React from "react";
import { Box, Divider, Typography } from "@mui/material";

function AboutTheStudio({studioInfo}) {
  return (
    <>
      {/* ABOUT STUDIO */}
      <Typography variant="h6" align="left" sx={{ mt: 5 }}>
        About the Studio:
      </Typography>
      <Divider sx={{ width: "100%" }} />

      {/* Description */}
      <Box sx={{ display: "flex", flexDirection: "row", my: 3 }}>
        <Box sx={{ minWidth: "120px", fontWeight: "bold", mr: 1 }}>
          Description
        </Box>
        <Box sx={{ flexDirection: "column" }}>
          <Typography variant="body1" align="left">
            {studioInfo.description}
          </Typography>
        </Box>
      </Box>

      {/* Address */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          my: 3,
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ minWidth: "120px", mr: 1, fontWeight: "bold" }}>Address</Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "flex-start",
          }}
        >
          <Typography variant="body1">{studioInfo.address}</Typography>
          <Typography variant="body1" align="left">
            {studioInfo.city}, {studioInfo.state} {studioInfo.zip}
          </Typography>
          <Typography variant="body1" align="left">
            {studioInfo.phone.slice(0, 3)}-{studioInfo.phone.slice(3, 6)}-
            {studioInfo.phone.slice(6, 10)}
          </Typography>
        </Box>
      </Box>

      {/* Owner Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          my: 3,
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ minWidth: "120px", mr: 1, fontWeight: "bold", mb: 5 }}>Owner</Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "flex-start",
          }}
        >
          <Typography variant="body1">
            {studioInfo.ownerFirstName} {studioInfo.ownerLastName}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default AboutTheStudio;
