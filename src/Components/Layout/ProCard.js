import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, Grid, Rating, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProCard({
  image,
  firstName,
  lastName,
  specialtiesList,
  id,
}) {
  return (
    <Card
      sx={{
        display: "inline-flex",
        m: 1,
        mb: 3,
        width: { lg: "23%", md: "32%", sm: "48%", xs: "100%" },
        minWidth: "220px",
        alignSelf: "inherit",
      }}
    >
      <CardActionArea>
        <CardMedia sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={image}
            component={Link}
            to={`/proDetail/${id}`}
            sx={{ width: 105, height: 105 }}
          />
        </CardMedia>

        <CardContent sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              gutterBottom
              variant="h6"
              color="primary"
              align="center"
              sx={{ fontWeight: "bold", mb: 0.2, textDecoration: "none" }}
              component={Link}
              to={`/proDetail/${id}`}
            >
              {firstName} {lastName}
            </Typography>
          </Box>

          <Grid container direction="row">
            <Grid item sx={{ width: "100%" }}></Grid>

            <Grid
              item
              display="flex"
              justifyContent="center"
              alignContent="center"
              sx={{ width: "100%", my: 1 }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignContent: "center",
                  width: "80%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {specialtiesList.map((chip) => (
                  <Chip
                    label={chip}
                    size="small"
                    color="info"
                    sx={{ mr: 0.5, mb: 0.5, alignSelf: "center" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
