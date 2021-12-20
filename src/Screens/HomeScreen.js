import React, { useState } from "react";
import { Grid } from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";
import { useAuth } from "../Context/AuthContext";

const image = ropesImg;
const HomeScreen = () => {
  const { auth, logout, userProfile } = useAuth();
  console.log(auth);

  // if userProfile is null but auth still exists, then logout() to get them in sync
  if (userProfile === null && auth.currentUser !== null) {
    logout()
  }


  return (
    <Grid sx={{ backgroundColor: "black", minHeight: "calc(100vh - 69px)" }}>
      <HeroSection
        height="700px"
        imgSrc={image}
        imgAlt="skdjfksdfksjd"
        title="Hi Rich!!!"
        subtitle="Connecting Pro's and Owners"
        btnText={auth.currentUser === null ? "Sign-up" : "Continue to Home"}
        btnLink={
          userProfile === null 
          ? 'signup'
          : userProfile['isOwner'] === true
          ? '/owner'
          : '/pro'
        }
      />
    </Grid>
  );
};

export default HomeScreen;
