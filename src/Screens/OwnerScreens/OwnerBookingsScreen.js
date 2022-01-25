import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";
import PageTitle from "../../Components/Layout/PageTitle";
import useFirestore_Bookings from "../../hooks/useFirestore_Bookings";
import OwnerBookingItem from "../../Components/Bookings/OwnerBookingItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function OwnerBookingsScreen() {
  const { retrieveBookingsByOwner } = useFirestore_Bookings();
  const [bookings, setBookings] = useState();
  const [bookingsThisWeek, setBookingsThisWeek] = useState();

  //Handle Times for filtering/Sorting
  const today = new Date();
  const nextWeek = new Date(new Date().setDate(today.getDate() + 7));
  const itemDate = (item) => {
    return new Date(item.date.toDate());
  };

  const thisWeeksBookings = () => {
    return bookings.filter((item) => {
      const sessionDate = itemDate(item);
      const inNextWeek = sessionDate < nextWeek && sessionDate >= today;
      return inNextWeek;
    });
  };

  useEffect(() => {
    //Retrieve all bookings
    retrieveBookingsByOwner(setBookings);
  }, []);

  useEffect(() => {
      //Filter bookings to get those in next 7 days
    if (bookings && bookings.length > 0) {
      setBookingsThisWeek(thisWeeksBookings());
    }
  }, [bookings]);

  return (
    <Layout>
      <PageTitle>Booked Sessions</PageTitle>
      
      <Box sx={{ py: 1, maxWidth: "850px", mx: "auto" }}>
        <Accordion defaultExpanded sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {bookingsThisWeek && <Typography variant="h6" sx={{ fontWeight: "bold" }} align="center">
              {`${bookingsThisWeek.length} Sessions This Week`}
            </Typography>}
          </AccordionSummary>
          <AccordionDetails>
            {bookingsThisWeek && bookingsThisWeek.length > 0 &&
              bookingsThisWeek
                .sort((a, b) => {
                  const dateA = new Date(a.date.toDate()).getDay();
                  const dateB = new Date(b.date.toDate()).getDay();
                  if (dateA === dateB) {
                    return a.startTime - b.startTime;
                  } else {
                    return a.date > b.date ? 1 : -1;
                  }
                })
                .map((item) => {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <OwnerBookingItem item={item} />
                    </Box>
                  );
                })}
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} align="center">
              Beyond the next 7 days
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bookings &&
              bookings
                .sort((a, b) => {
                  const dateA = new Date(a.date.toDate()).getDay();
                  const dateB = new Date(b.date.toDate()).getDay();
                  if (dateA === dateB) {
                    return a.startTime - b.startTime;
                  } else {
                    return a.date > b.date ? 1 : -1;
                  }
                })
                .map((item) => {
                  const today = new Date();
                  const nextWeek = new Date(
                    new Date().setDate(today.getDate() + 7)
                  );
                  const sessionDate = new Date(item.date.toDate());
                  //DISPLAY IF BEYOND NEXT 7 DAYS
                  const toDisplay = sessionDate > nextWeek;
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        display: toDisplay === true ? "block" : "none",
                      }}
                    >
                      <OwnerBookingItem item={item} />
                    </Box>
                  );
                })}
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} align="center">
              Past Sessions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {bookings &&
              bookings
                .sort((a, b) => {
                  const dateA = new Date(a.date.toDate()).getDay();
                  const dateB = new Date(b.date.toDate()).getDay();
                  if (dateA === dateB) {
                    return a.startTime - b.startTime;
                  } else {
                    return a.date > b.date ? 1 : -1;
                  }
                })
                .map((item) => {
                  const today = new Date();
                  const nextWeek = new Date(
                    new Date().setDate(today.getDate() + 7)
                  );
                  const sessionDate = new Date(item.date.toDate());
                  //DISPLAY IF IN PAST
                  const toDisplay = sessionDate < today;
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        display: toDisplay === true ? "block" : "none",
                      }}
                    >
                      <OwnerBookingItem item={item} />
                    </Box>
                  );
                })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Layout>
  );
}

export default OwnerBookingsScreen;
