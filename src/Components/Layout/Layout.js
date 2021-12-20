import React from "react";
import { Container, Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box sx={{padding: '10px', backgroundColor: '#F7F7F7', minHeight: '90vh'}}>
      <Container maxWidth="xl" sx={{padding: '10px', backgroundColor: 'white'}}>
        <Container maxWidth='lg'>
          {children}
          </Container>
          </Container>
    </Box>
  );
}

export default Layout;
