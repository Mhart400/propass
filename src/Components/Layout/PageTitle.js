import React from "react";
import { Typography } from "@mui/material";

function PageTitle({children}) {
  return (
    <Typography
      align="center"
      sx={{
        color: "primary.main",
        fontWeight: 'bold',
        my: 2,
        typography: { xs: "h4", sm: "h3", md: "h3", lg: "h2" },
        width: '100%'
      }}
    >
      {children}
    </Typography>
  );
}

export default PageTitle;
