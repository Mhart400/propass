import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import Layout from "../../Components/Layout/Layout";
import Slider from "../../Components/Slider/Slider";
import StudioDetailBooking from "../../Components/BookingWidgets/StudioDetailBooking";
import AboutTheStudio from "../../Components/StudioDetails/AboutTheStudio";
import { useAuth } from "../../Context/AuthContext";

function StudioDetailScreen() {
  const { studioId } = useParams();
  const history = createBrowserHistory();
  const [studioInfo, setStudioInfo] = useState();
  const { retrieveStudioData_allNested } = useFirestore();
  const [slideList, setSlideList] = useState();
  const { userProfile} = useAuth();

  useEffect(() => {
    retrieveStudioData_allNested(studioId, setStudioInfo);
  }, []);

  return (
    <Layout>
      <Button sx={{ my: 1 }} onClick={history.back}>
        Back
      </Button>
      {studioInfo && (
        <Grid
          container
          direction="row"
          sx={{ overflow: "hidden", width: "100%" }}
        >
          <Grid
          // Row 1
            item
            container
            columns={20}
            sx={{
              mb: 2,
            }}
          >
            <Grid item xs={20} sm={20} md={10} >
              <Typography variant="h4" align="left" gutterBottom>
                {studioInfo.name}
              </Typography>

              <Box sx={{ mr: 3, overflow: "hidden", borderRadius: "15px" }}>
                <Slider
                  slides={
                    studioInfo.StudioImages
                      ? [
                        studioInfo.MainImage.url,
                          ...studioInfo.StudioImages.map((image) => {
                            return image.url;
                          }),
                        ]
                      : [studioInfo.MainImage.url]
                  }
                  height="300px"
                  width={"100%"}
                  objectFit="fit"
                />
              </Box>

            </Grid>
            <Grid item xs={20} sm={20} md={10} >
              <AboutTheStudio studioInfo={studioInfo} />
                  
            </Grid>

          </Grid>
          <Grid
          // Row 2
            item container 
            columns={20}
          >
            <AboutTheStudio studioInfo={studioInfo} />
          </Grid>
          {studioInfo && userProfile.isPro === true && <StudioDetailBooking studioInfo={studioInfo} />}
        </Grid>
      )}
    </Layout>
  );
}

export default StudioDetailScreen;
