import React from "react";
import { Container, Box, Paper } from "@mui/material";

function GreyLayout({ children }) {
  return (
    <Box
      sx={{
        padding: { xs: "0px", sm: "2px", md: "3px", lg: "5px" },
        backgroundColor: "background.grey",
        
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 0, sm: 1, md: 1.5, lg: 2 },
          
        }}
      >
          <Container maxWidth="lg" sx={{minHeight: "calc(100vh - 339px)"}}>{children}</Container>
      </Container>
    </Box>
  );
}

export default GreyLayout;
