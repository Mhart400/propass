import React, { useState, useRef, useEffect } from "react";
import { Grid, Box, Divider, Typography, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PageLoading from "../PageLoading";
import useFirestore from "../../hooks/useFirestore";
import OpenCloseHours from "../Calendar/OpenCloseHours";

function OwnerStudioHours_Edit({studioId}) {
  const { retrieveStudioDocs, deleteStudioDocs, addStudioDoc } = useFirestore();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const initialTimes = {
    0: { index: 0, day: "Monday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    1: { index: 1, day: "Tuesday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    2: { index: 2, day: "Wednesday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    3: { index: 3, day: "Thursday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    4: { index: 4, day: "Friday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    5: { index: 5, day: "Saturday", openTime: "06:00 AM", closeTime: "09:00 PM" },
    6: { index: 6, day: "Sunday", openTime: "06:00 AM", closeTime: "09:00 PM" },
  };

  const [studioHours, setStudioHours] = useState();

  //Handle Editing & Saving
  const editValues = () => {
    setEditing(true);
    console.log(studioHours);
  };

  async function saveValues() {
    const x = await deleteStudioDocs(studioId, "StudioHours")
    console.log('Deleted. Now adding new StudioTimes doc');
    addStudioDoc(studioId, "StudioHours", studioHours[0]);
    setEditing(false);
  }

  const setDayTimes = (timeObj) => {
    let newValues = {};
    if (studioHours && studioHours.length > 0) {
      newValues = {...studioHours[0]};
    } else {
      newValues = {...initialTimes};
    }
    console.log(timeObj);
    console.log(newValues);
    newValues[timeObj["index"]][timeObj["field"]] = timeObj["value"];
    setStudioHours([newValues]);
    console.log(newValues);
  };

  useEffect(() => {
    retrieveStudioDocs(studioId, "StudioHours", setStudioHours);
  }, []);
  
  const [displayTimes, setDisplayTimes] = useState(initialTimes)

  useEffect(() => {
    if (studioHours && studioHours.length > 0) {
      setDisplayTimes(studioHours[0])
    } else {
      setDisplayTimes(initialTimes)
    }
  }, [studioHours])

  

  return (
    <Box component="form" sx={{ my: "15px", mb: 10}}>
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
              Studio Hours
            </Typography>
            <IconButton
              onClick={editing ? saveValues : editValues}
              size="small"
              sx={{ color: "text.primary" }}
            >
              {editing ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Box>
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ width: "100%", backgroundColor: "text.primary" }}
        />
      </Grid>

      {/* Form Body */}
      <Box sx={{ width: "100%", position: "relative" }}>
        {loading && <PageLoading />}
        <Grid direction="row" container>
          <Grid xs={4}></Grid>
          <Grid xs={4}>
            <Typography variant="subtitle2">Opening Time</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="subtitle2">Closing Time</Typography>
          </Grid>
        </Grid>
        {displayTimes && Object.keys(displayTimes).map((day) => {
          if (displayTimes[day].day) {
            return (
              <OpenCloseHours
                day={displayTimes[day].day}
                index={displayTimes[day].index}
                initialOpenTime={displayTimes[day].openTime}
                initialCloseTime={displayTimes[day].closeTime}
                setDayTimes={setDayTimes}
                key={`${JSON.stringify(displayTimes[day])}_dailyhours`}
                editing={editing}
              />
            );
          }
        })
        }
      </Box>
    </Box>
  );
}

export default OwnerStudioHours_Edit;
