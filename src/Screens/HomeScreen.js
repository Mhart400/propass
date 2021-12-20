import React from "react";
import { Grid } from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";
import { useAuth } from "../Context/AuthContext";

const image = ropesImg;
const HomeScreen = () => {
  const { auth, getProfile, userProfile } = useAuth();
  console.log(auth);

  //if auth exists but there is no userProfile set (instead of using local storage)
  if (auth.user && (userProfile === null) | (userProfile === undefined)) {
    console.log("Need to get a profile loaded");
    const userProfile = getProfile(auth.user.email);
    console.log(userProfile);
  }

  
  return (
    <Grid sx={{ backgroundColor: "black", minHeight: "calc(100vh - 69px)" }}>
      <HeroSection
        height="700px"
        imgSrc={image}
        imgAlt="skdjfksdfksjd"
        title="Hi Rich!!!"
        subtitle="Connecting Pro's and Owners"
        btnText={
          (userProfile === null) | (userProfile === undefined)
            ? "Sign-up"
            : "Continue to Home"
        }
        btnLink={
          (userProfile === null) | (userProfile === undefined)
            ? "/signup"
            : userProfile["isOwner"] == true
            ? "/owner/"
            : "/pro/"
        }
      />
    </Grid>
  );
};

export default HomeScreen;
