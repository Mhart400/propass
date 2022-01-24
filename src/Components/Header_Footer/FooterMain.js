import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

function FooterMain() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.dark",
        minHeight: "200px",
      }}
    >
      <Container maxWidth="lg" sx={{}}>
        <Grid container direction="row" sx={{ display: "flex", py: '75px' }}>
          <Grid
            item
            container
            xs={12}
            sm={6}
            md={4}
            direction="column"
            sx={{ padding: "20px" }}
          >
            <Typography variant='h4' color={'white'} gutterBottom >ProPass</Typography>
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CopyrightIcon sx={{ display: "inline", color: "white" }} />
              <Typography
                display={"inline"}
                sx={{ fontSize: "14px", color: "white", marginX: '5px'  }}
              >
                2021
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} sm={6} md={4} direction="column" sx={{ padding: "20px" }}> 
            <Typography variant='h6' align='center' gutterBottom sx={{color: 'white'}} >We're Social!</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                <InstagramIcon sx={{color: 'secondary.main', fontSize: '40px'}}/>
                <FacebookIcon sx={{color: 'secondary.main', fontSize: '40px'}}/>
                <TwitterIcon sx={{color: 'secondary.main', fontSize: '40px'}}/>
                
            </Box>
          </Grid>
          <Grid item container xs={12} sm={6} md={4} direction="column" sx={{ padding: "20px" }}>
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FooterMain;
