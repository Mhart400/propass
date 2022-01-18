import React, { useState, useEffect } from "react";
import stock_image from "../../Images/ropes.jpeg";
import GymCard from "./GymCard";
import ProCard from "./ProCard";
import { Box, Grid, Button } from "@mui/material";
import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import useFirestore from "../../hooks/useFirestore";

function CardBox({ role }) {
  const { retrieveUsers } = useFirestore();

  const [userList, setUserList] = useState();

  useEffect(() => {
    retrieveUsers(role, setUserList);
  }, []);

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Grid
        direction="row"
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        sx={{ flexWrap: "wrap" }}
      >
        {(userList && role === "owner")
          ? userList.map((user) => (
              <GymCard
                key={user.id}
                image={user.avatarUrl}
                title={`${user.firstName} ${user.lastName}`}
                description={
                  "1000sqft studio with wweights, kettlebells, and Peleton bikes. Juicebar on site"
                }
                rating={5}
                price={40}
                chipList={
                  user.specialties ? Object.values(user.specialties) : []
                }
              />
            ))
          : userList && userList.map((user) => (
              <ProCard
                key={user.id}
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                image={user.avatarUrl}
                specialtiesList={
                  user.specialties ? Object.values(user.specialties) : []
                }
              />
            ))}
      </Grid>
    </Box>
  );
}

export default CardBox;
