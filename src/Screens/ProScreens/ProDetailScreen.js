import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useParams, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import PageLoading from "../../Components/PageLoading";
import Layout from "../../Components/Layout/Layout";

function ProDetailScreen() {
  const { retrieveUserData_allNested, retrieveUserData_Nested, retrieveDocs } =
    useFirestore();
  const { userId } = useParams();
  const { userProfile } = useAuth();
  let history = createBrowserHistory();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [specialties, setSpecialties] = useState();
  const [educationItems, setEducationItems] = useState();

  useEffect(() => {
    retrieveUserData_Nested(userId, "specialties", setSpecialties);
    retrieveUserData_allNested(userId, setUserData);
    retrieveDocs(userId, "Education", setEducationItems);
  }, []);

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setLoading(false);
    }
  }, [userData]);

  return (
    <Layout>
      {loading && <PageLoading />}
      {!loading && (
        <Box
          sx={{
            py: 1,
            // minHeight: "60vh",
            px: { lg: 20, md: 15, sm: 5, xs: 1 },
          }}
        >
          <Button variant="outlined" onClick={history.back}>
            Back
          </Button>
          <Typography variant="h5" align="left" sx={{ my: 2 }}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
            <Avatar src={userData.avatarUrl} sx={{ height: 120, width: 120 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Contact Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>Email:</Typography>
              <Typography>{userData.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>
                Address:
              </Typography>
              <Typography>{userData.address}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>City:</Typography>
              <Typography>{userData.city}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>State:</Typography>
              <Typography>{userData.state}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>Zip:</Typography>
              <Typography>{userData.zip}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 3, fontWeight: "bold" }}>Phone:</Typography>
              <Typography>{userData.phone}</Typography>
            </Box>
          </Box>
          <Box sx={{ my: 5 }}>
            <Typography
              variant="h6"
              sx={{ mr: 3, textDecoration: "underline", display: "block" }}
            >
              Specialties
            </Typography>
            <Box sx={{ display: "flex", width: "100%" }}>
              {specialties &&
                specialties.map((item, index) => (
                  <Chip label={item} color="secondary" sx={{ mr: 1, mt: 1 }} />
                ))}
            </Box>
          </Box>

          <Box sx={{ my: 5 }}>
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Education:
            </Typography>
            {educationItems &&
              educationItems.map((item) => {
                return (
                  <Card sx={{width: '250px', display: 'inline-flex', mr: 1}}>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight={'bold'}
                      >
                        {item.school}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "100%" }}
                      >
                        {item.degree}
                      </Typography>
                      <Typography variant="body2" sx={{ width: "100%" }}>
                        {item.year}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export default ProDetailScreen;
