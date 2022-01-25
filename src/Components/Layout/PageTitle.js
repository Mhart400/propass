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
        typography: { xs: "h5", sm: "h4", md: "h4", lg: "h3" },
        width: '100%'
      }}
    >
      {children}
    </Typography>
  );
}

export default PageTitle;
