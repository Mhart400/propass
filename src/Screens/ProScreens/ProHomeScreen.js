import { Container, Grid, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

function ProHomeScreen() {
  const { logout, userProfile } = useAuth();

  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxWidth="md">
        <Grid container direction="column">
          <Typography>You are logged in as a Pro!!!</Typography>
          <p>{`Hello ${userProfile['firstName']} ${userProfile['lastName']}!`}</p>
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2, width: "150px" }}
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ProHomeScreen;

