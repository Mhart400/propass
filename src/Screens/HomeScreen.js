import React from "react";
import { Grid } from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";
import { useAuth } from "../Context/AuthContext";

const image = ropesImg;
const HomeScreen = () => {
  const { userProfile } = useAuth();

  return (
    <Grid sx={{ backgroundColor: "black", minHeight: "calc(100vh - 69px)" }}>
      <HeroSection
        height="700px"
        imgSrc={image}
        imgAlt="skdjfksdfksjd"
        title="Hi Rich!!!"
        subtitle="Connecting Pro's and Owners"
        btnText={userProfile ? "Continue to Home" : "Sign-up"}
        btnLink={
          userProfile["isOwner"] === true
            ? "/owner/"
            : userProfile["isPro"] === true
            ? "/pro/"
            : "/signup"
        }
      />
    </Grid>
  );
};

export default HomeScreen;
