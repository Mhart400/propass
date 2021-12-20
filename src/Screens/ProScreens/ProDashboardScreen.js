import {
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import PageLoading from "../../Components/PageLoading";

function ProDashboardScreen() {
  const { logout, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const output = (
    
      <Grid container direction="column">
        <p>{`Hello ${userProfile["firstName"]} ${userProfile["lastName"]}!`}</p>
        <Typography gutterBottom>You are logged in as a Pro!!!</Typography>
        <br/>
        <Typography>This page will contain:</Typography>
        <ul>
          <li>List of Upcoming Bookings</li>
          <li>Gyms near me (click on gym to make a booking)</li>
        </ul>
      </Grid>
    
  );

  return (
    <Layout>
      {loading && <PageLoading />}
      {!loading && output}
    </Layout>
  );
}

export default ProDashboardScreen;
