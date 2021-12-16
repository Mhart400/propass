import { Container, Grid, Typography, Box } from "@mui/material";
import HeroSection from "../Components/HeroSection";
import ropesImg from "../Images/ropes.jpeg";

const LandingPage = () => {
  return (
    <HeroSection
      height="80vh"
      imgSrc={ropesImg}
      imgAlt="skdjfksdfksjd"
      title="ProPass"
      subtitle="Connecting Pro's and Owners"
      btnText="Sign-In"
    />
  );
};

export default LandingPage;
