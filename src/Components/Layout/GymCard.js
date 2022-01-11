import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Grid, Rating, Box } from "@mui/material";

export default function GymCard({
  image,
  title,
  description,
  rating,
  price,
  chipList,
}) {
  return (
    <Card 
    sx={{ display: 'inline-flex', m: 1, mb: 3, width: {lg: '31%', md: '48%', sm: '43%', xs: '100%'}, minWidth: '280px', alignSelf: 'inherit' }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ pt: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 0.2 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: 0, py: 0 }}>
            {description}
          </Typography>
          <Grid container direction="row">
            <Grid item sx={{ width: "100%" }}>
              <Rating value={rating} readOnly size="small" sx={{ my: 0.5 }} />
            </Grid>
            <Grid item display='flex' justifyContent="space-between" alignContent='center' sx={{width: '100%'}}>
              <Box sx={{ display: "inline-flex", alignContent: 'center', width: '70%' }}>
                {chipList.map((chip) => (
                  <Chip
                    label={chip}
                    size="small"
                    color="info"
                    sx={{ mr: 0.5, alignSelf: 'center'}}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "flex-end",
                  
                }}
              >
                <Typography
                  variant="h6"
                  display="inline-flex"
                  sx={{ ml: 4 }}
                >
                  ${price}/hr
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
