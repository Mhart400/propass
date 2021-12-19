import React from 'react'
import { Grid} from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";

const image = ropesImg
const HomeScreen = () => {
  return (
    <Grid sx={{backgroundColor: 'black', minHeight: 'calc(100vh - 69px)'}} >
      <HeroSection
      height="700px"
      imgSrc={image}
      imgAlt="skdjfksdfksjd"
      title="Hi Rich!!!"
      subtitle="Connecting Pro's and Owners"
      btnText="Sign-Up"
      btnLink='/signup'
      />
      </Grid>
  );
};

export default HomeScreen;
