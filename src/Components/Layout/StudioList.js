import React, { useState, useEffect } from "react";
import StudioCard from "./StudioCard";
import { Box, Grid } from "@mui/material";
import useFirestore from "../../hooks/useFirestore";

function StudioList() {
  const { retrieveAllStudios } = useFirestore();

  const [studioList, setStudioList] = useState();

  useEffect(() => {
    retrieveAllStudios(setStudioList);
  }, []);

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Grid
        direction="row"
        display="flex"
        alignContent="center"
        justifyContent="center"
        sx={{ flexWrap: "wrap" }}
      >
        {studioList && studioList.map((studio) => (
              <StudioCard
                key={studio.id}
                id={studio.id}
                studioInfo={studio}
              />
            ))}
      </Grid>
    </Box>
  );
}

export default StudioList;
