import { Button, Grid, Typography } from "@mui/material";

const HeroSection = ({ height, imgSrc, imgAlt, title, subtitle, btnText }) => {
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
      <img
        src={imgSrc}
        alt={imgAlt}
        height="100%"
        style={{ minWidth: "100%", flexShrink: 0 }}
      />
      <Grid
        container
        sx={{
          position: "absolute",
          height: '100%',
          backgroundColor: "rgba(0,0,0, .6)",
        }}
      >
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              color: "primary.light",
              fontWeight: 400,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variant="h3"
            align="center"
            color="common.white"
            sx={{
              mb: 10,
            }}
          >
            {subtitle}
          </Typography>
          <Button variant="outlined" color="primary" sx={{ fontSize: "18px", padding: '8px 45px'}}>
            Sign-in
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
