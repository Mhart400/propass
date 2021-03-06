import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoading = () => {
  return (
    <Box
      sx={{
        zIndex: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#2d2d2d",
        opacity: '70%',
        position: 'absolute'
      }}
    >
      <CircularProgress size={120} thickness={6} sx={{position: 'absolute'}} />
    </Box>
  );
};

export default PageLoading;
