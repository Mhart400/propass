import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import Layout from "../../Components/Layout/Layout";
import Slider from "../../Components/Slider/Slider";
import StudioDetailBooking from "../../Components/BookingWidgets/StudioDetailBooking";
import AboutTheStudio from "../../Components/StudioDetails/AboutTheStudio";

function StudioDetailScreen() {
  const { studioId } = useParams();
  const history = createBrowserHistory();
  const [studioInfo, setStudioInfo] = useState();
  const { retrieveStudioData_allNested } = useFirestore();
  const [slideList, setSlideList] = useState();

  useEffect(() => {
    retrieveStudioData_allNested(studioId, setStudioInfo);
  }, []);

  return (
    <Layout>
      <Button sx={{ my: 1 }} onClick={history.back}>
        Back
      </Button>
      <Grid
        container
        direction="row"
        sx={{ overflow: "hidden", width: "100%" }}
      >
        <Grid
          item
          display="inline-flex"
          sx={{
            pr: 1,
            width: { lg: "70%", md: "60%", sm: "100%", xs: "100%" },
          }}
        >
          {studioInfo && (
            <Box sx={{ mb: 3, width: "100%" }}>
              <Typography variant="h4" align="left" gutterBottom>
                {studioInfo.name}
              </Typography>

              <Box sx={{ mr: 3, overflow: "hidden", borderRadius: "15px" }}>
                <Slider
                  slides={studioInfo.StudioImages ? [
                    studioInfo.MainImage.url,
                    ...studioInfo.StudioImages.map((image) => {
                      return image.url;
                    }),
                  ] : [studioInfo.MainImage.url]}
                  height="300px"
                  width={"100%"}
                  objectFit="fit"
                />
              </Box>

              <AboutTheStudio studioInfo={studioInfo} />
              <AboutTheStudio studioInfo={studioInfo} />
            </Box>
          )}
        </Grid>
        <Grid
          item
          sx={{
            display: "inline-flex",
            width: { lg: "30%", md: "40%", sm: "100%", xs: "100%" },
          }}
        >
          {studioInfo && <StudioDetailBooking studioInfo={studioInfo} />}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default StudioDetailScreen;
