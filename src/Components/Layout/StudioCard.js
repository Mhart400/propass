import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Grid, Rating, Box } from "@mui/material";


export default function StudioCard({ studioInfo }) {
    
    return (
    <Card
      sx={{
        display: "inline-flex",
        m: 1,
        mb: 3,
        width: { lg: "30%", md: "30%", sm: "45%", xs: "100%" },
        minWidth: "280px",
        alignSelf: "inherit",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={studioInfo.MainImage.url}
          alt="green iguana"
        />
        <CardContent sx={{ pt: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 0.2 }}
          >
            {studioInfo.name}
          </Typography>
          <Typography
            variant="body1"
            color="header.primary"
            sx={{ my: 0, py: 0, }}
            noWrap
          >
            {studioInfo.address}, {studioInfo.city} {studioInfo.state}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ my: 0, py: 0 }}
            noWrap
            
          >
            {studioInfo.description}
          </Typography>
          <Grid container direction="row">
            <Grid
              item
              display="flex"
              justifyContent="flex-start"
              alignContent="center"
              sx={{ width: "100%", my: 1 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="h6" 
                sx={{color: 'header.primary'}} 
                >
                  ${studioInfo.rate}/hr
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
