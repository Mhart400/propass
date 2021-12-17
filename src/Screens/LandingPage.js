import React from 'react'
import { Grid} from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";

const image = ropesImg
const LandingPage = () => {
  return (
    <Grid >
      <HeroSection
      height="100vh"
      imgSrc={image}
      imgAlt="skdjfksdfksjd"
      title="ProPass"
      subtitle="Connecting Pro's and Owners"
      btnText="Sign-Up"
      btnLink='/signup'
      />
      </Grid>
  );
};

export default LandingPage;
