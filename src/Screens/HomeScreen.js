import React from "react";
import { Grid } from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";
import { useAuth } from "../Context/AuthContext";

const image = ropesImg;
const HomeScreen = () => {
  const { auth, logout, userProfile } = useAuth();
  console.log(auth);

  // if userProfile is null but auth still exists, then logout() to get them in sync
  if ((userProfile === null | userProfile === undefined) && auth.currentUser !== null) {
    console.log('logging out')
    logout()
  }


  return (
    <Grid sx={{ backgroundColor: "black", minHeight: "calc(100vh - 69px)" }}>
      <HeroSection
        height="700px"
        imgSrc={image}
        imgAlt="skdjfksdfksjd"
        title="Launching Soon"
        subtitle="Connecting Pro's and Owners"
        btnText={auth.currentUser === null ? "Sign-up" : "Continue to Dashboard"}
        btnLink={
          userProfile === null | userProfile === undefined
          ? 'signup'
          : userProfile['isOwner'] === true
          ? '/owner/dashboard'
          : '/pro/dashboard'
        }
      />
    </Grid>
  );
};

export default HomeScreen;
