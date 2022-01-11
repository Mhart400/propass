import React, { useState, useRef, useEffect } from "react";
import { Grid, Box, Divider, Typography, IconButton, Button } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PageLoading from "../PageLoading";
import useFirestore from "../../hooks/useFirestore";
import OpenCloseHours from "../Calendar/OpenCloseHours";

function OwnerStudioHours_AddNew({ values, collectStudioHours }) {

  const setDayTimes = (timeObj) => {      
    let newValues = {...values}
    newValues[timeObj["index"]][timeObj["field"]] = timeObj["value"];
    collectStudioHours(newValues)    
  };


  return (
    <Box component="form" sx={{ my: "15px", mb: 10 }}>
      <Grid
        container
        direction="column"
        sx={{ justifyContent: "flex-start", alignItems: "flex-start", my: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
              Studio Hours & Availability
            </Typography>
            
          </Box>
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ width: "100%", backgroundColor: "text.primary" }}
        />
      </Grid>

      {/* Form Body */}
      <Box sx={{ width: "100%", position: "relative" }}>
        
        <Grid direction="row" container>
          <Grid xs={4}></Grid>
          <Grid xs={4}>
            <Typography variant="subtitle2">Opening Time</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="subtitle2">Closing Time</Typography>
          </Grid>
        </Grid>
        {values && Object.keys(values).map((day) => {
          if (values[day].day) {
            return (
              <OpenCloseHours
                day={values[day].day}
                index={values[day].index}
                initialOpenTime={values[day].openTime}
                initialCloseTime={values[day].closeTime}
                setDayTimes={setDayTimes}
                key={`${JSON.stringify(values[day])}_dailyhours`}
                editing={true}
              />
            );
          }
        })
        }
      </Box>
      
    </Box>
  );
}

export default OwnerStudioHours_AddNew;
