import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import { useNavigate} from 'react-router-dom'

function OwnerHomeScreen() {
  const { logout } = useAuth();
  
  const navigate = useNavigate()



  return (
    <>
      <Container maxWidth="md">
        <Box component="div" sx={{ width: "100%"}}>
          <Typography>You are logged in!!!</Typography>
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2, width: "150px" }}
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
          <Button onClick={logout}>Log Out</Button>
        </Box>
      </Container>
    </>
  );
}

export default OwnerHomeScreen;
