import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Modal,
  Divider,
  IconButton,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GymModal from "./GymModal";
import AddNewGymModal from "./AddNewGymModal";
import useFirestore from "../../hooks/useFirestore";

function OwnerStudioList() {
  const [editing, setEditing] = useState();
  const [displayModal, setDisplayModal] = useState({
    open: false,
    gymId: null,
  });
  const [displayAddNewGymModal, setDisplayAddNewGymModal] = useState(false);
  const [studioList, setStudioList] = useState();
  const { retrieveAllMyStudios } = useFirestore();

  const editValues = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  const openAddGymModal = (gymId) => {
    setDisplayModal({ open: true, gymId: gymId });
  };

  const addNewGym = () => {
    setDisplayAddNewGymModal(true);
  };

  const handleClose = () => {
    setDisplayModal({ open: false, gymId: null });
    setDisplayAddNewGymModal(false);
  };

  const fakeStudios = [
    {
      url: "https://media1.fdncms.com/mia/imager/u/magnum/13505070/glutehouse_-_corey_jenkins_photography.jpg?cb=1639486821",
      name: "BestGym1",
      address: "15 Main street",
      city: "Everett",
      state: "MA",
      zip: "02149",
      rate: "50",
      id: 0,
    },
    {
      url: "https://cdn.fitimg.in/blog_photo_888E6AF97E7BD9D.png",
      name: "BestGym2",
      address: "15 Main street",
      city: "Everett",
      state: "MA",
      zip: "02149",
      rate: "75",
      id: 1,
    },
    {
      url: "https://truefitness.com/wp-content/uploads/2013/06/TRUE-Fitness-marketing-techniques-for-fitness-club-success-2-e1623277934709-1024x496.jpeg",
      name: "BestGym3",
      address: "15 Main street",
      city: "Everett",
      state: "MA",
      zip: "02149",
      rate: "150",
      id: 2,
    },
  ];

  useEffect(() => {
      retrieveAllMyStudios(setStudioList)
  }, [displayModal]);

  return (
    <Box sx={{ mb: 7, position: "relative" }}>
      <GymModal
        open={displayModal.open}
        closeModal={handleClose}
        studioId={displayModal.gymId}
      />
      <AddNewGymModal open={displayAddNewGymModal} closeModal={handleClose} />

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography sx={{ mr: 2 }} color="primary.dark" variant="h6">
          Studios you own
        </Typography>
        <IconButton
          onClick={editValues}
          size="small"
          sx={{ color: "text.primary" }}
        >
          {editing ? <LockOpenIcon /> : <LockIcon />}
        </IconButton>
      </Box>
      <Divider
        variant="fullWidth"
        sx={{ width: "100%", backgroundColor: "text.primary", mb: 3 }}
      />
      <Button disabled={!editing} variant="contained" onClick={addNewGym}>
        Add New Studio
      </Button>
      <Typography sx={{ display: "block", my: 1 }} variant="overline">
        Click on a studio to edit
      </Typography>
      <Box
        sx={{
          p: 1,
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {studioList && studioList.map((gym) => {
          return (
            <Card sx={{ width: "100%", my: 2 }} key={gym.id}>
              <CardActionArea onClick={() => openAddGymModal(gym.id)}>
                {gym.MainImage && <CardMedia component="img" image={gym.MainImage.url} height={120} />}
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {gym.name}
                  </Typography>
                  <Typography>
                    {gym.address}, {gym.city} {gym.state}
                  </Typography>
                  <Typography
                    sx={{ color: "primary.dark", fontWeight: "bold" }}
                  >
                    ${gym.rate}/hour
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default OwnerStudioList;
