import React from "react";
import { Box } from "@mui/material";

function DashboardBox({children}) {
  return (
    <Box
      sx={{
        my: 2,
        width: "100%",
        boxSizing: "border-box",
        p: 2,
        backgroundColor: "background.main",
      }}
    >
      {children}
    </Box>
  );
}

export default DashboardBox;
