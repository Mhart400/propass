import { Grid, Typography, Box, Divider } from "@mui/material";
import React, { useState } from "react";
import StudioList from "../../Components/Layout/StudioList";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import PageLoading from "../../Components/PageLoading";
import PageTitle from "../../Components/Layout/PageTitle";
import CardBox from "../../Components/Layout/CardBox";
import Slider from "../../Components/Slider/Slider";

function OwnerDashboardScreen() {
  const { logout, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
  ];

  const output = (
    <Grid container direction="column">
      <PageTitle>Owner Dashboard</PageTitle>
      
      
      
      
      <Box sx={{ my: 6, p: 2, width: '100%'}}>
        <Typography gutterBottom variant="h5" align='center' >
          Pros on ProPass
        </Typography>
        <Divider />
        <CardBox role="pro" />
      </Box>
      
      <Box sx={{ my: 6, p: 2, width: '100%'}}>
        <Typography gutterBottom variant="h5" align='center' >
          Studios near me
        </Typography>
        <Divider />
        <StudioList />
      </Box>

      <Slider slides={images} />
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
      {output}
    </Layout>
  );
}
export default OwnerDashboardScreen;
