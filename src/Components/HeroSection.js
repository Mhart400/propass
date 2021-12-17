import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = ({ height, imgSrc, imgAlt, title, subtitle, btnText, btnLink }) => {
  return (
    <Grid
      component="section"
      container
      sx={{
        position: "relative",
        height: height,
        width: "100vw",
        overflow: "hidden",
        // zIndex: "-100",
        mb: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component='img'
        src={imgSrc}
        alt={imgAlt}
        height="100%"
        sx={{ minWidth: "100%", flexShrink: 0 }}
      />

      <Grid
        container
        sx={{
          position: "absolute",
          height: "100%",
          backgroundColor: "rgba(0,0,0, .6)",
        }}
      >
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{mt: {xs: 5, sm: 10, md: 15, lg: 20}}}
        >
          <Typography
            
            align="center"
            gutterBottom
            sx={{
              color: "primary.light",
              fontWeight: 400,
              typography: {xs: 'h3', sm: 'h2', md: 'h1', lg: 'h1'},
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            
            align="center"
            color="common.white"
            sx={{
              mb: 10,
              typography: {xs: 'h4', sm: 'h4', md: 'h3', lg: 'h3'},
            }}
          >
            {subtitle}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            
            component={Link}
            to={btnLink}
            sx={{ fontSize: "18px", padding: "8px 45px" }}
          >
            {btnText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
