import React from 'react'
import { Grid} from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";

const LandingPage = () => {
  return (
    <Grid >
      <HeroSection
      height="100vh"
      imgSrc={ropesImg}
      imgAlt="skdjfksdfksjd"
      title="ProPass"
      subtitle="Connecting Pro's and Owners"
      btnText="Sign-In"
      />
      </Grid>
  );
};

export default LandingPage;
