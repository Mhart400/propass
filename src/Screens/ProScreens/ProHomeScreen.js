import { Container, Grid, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth, AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";


function ProHomeScreen() {
  const { logout, userProfile } = useAuth();
  const x = useContext(AuthContext)
  console.log(x)

  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxWidth="md">
        <Grid container direction="column">
          <Button
            component={Link}
            to="/"
            sx={{ ml: 0, my: 2, width: "150px" }}
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
          <Typography>You are logged in as a Pro!!!</Typography>
          <p>{`Hello ${userProfile['firstName']} ${userProfile['lastName']}!`}</p>
          <Button
            sx={{width: '150px'}}
            variant='outlined'
            size='small'
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

