import React from "react";
import { Container, Box, Paper } from "@mui/material";

function Layout({ children }) {
  return (
    <Box sx={{padding: '10px', backgroundColor: 'background.default', minHeight: '500px'}}>
      <Container maxWidth="xl" sx={{padding: '10px', backgroundColor: 'background.default'}}>
        <Paper>
        <Container maxWidth='lg'>
          {children}
        </Container>
        </Paper>
      </Container>
    </Box>
  );
}

export default Layout;
