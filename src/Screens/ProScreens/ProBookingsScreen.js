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
import ProBookingItem from "../../Components/Bookings/ProBookingItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConfirmCancelBookingModal from "../../Components/Bookings/ConfirmCancelBookingModal";
import PageLoading from "../../Components/PageLoading";

function ProBookingsScreen() {
  const { retrieveBookings, deleteBooking } = useFirestore_Bookings();
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState();

  async function handleCloseModal(toDelete) {
    setShowModal(false);
    if (toDelete === true) {
      setLoading(true);
      await deleteBooking(modalItem.id);
      setBookings(bookings.filter(item => item.id !== modalItem.id))
      setLoading(false);
    }
    setModalItem();
  }

  const handleCancelBooking = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    retrieveBookings(setBookings);
  }, []);

  return (
    <Layout>
      {(loading || !bookings) && <PageLoading />}
      <ConfirmCancelBookingModal
        open={showModal}
        closeModal={handleCloseModal}
        item={modalItem}
      />
      <PageTitle>Booked Sessions</PageTitle>
      <Box sx={{ py: 1, maxWidth: "850px", mx: "auto" }}>
        <Accordion defaultExpanded sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} align="center">
              This Week:
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
                  //DISPLAY IF WITHIN NEXT 7 DAYS
                  const toDisplay =
                    sessionDate < nextWeek && sessionDate >= today;
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        display: toDisplay === true ? "block" : "none",
                      }}
                    >
                      <ProBookingItem
                        item={item}
                        handleCancelBooking={handleCancelBooking}
                      />
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
                      <ProBookingItem
                        item={item}
                        handleCancelBooking={handleCancelBooking}
                      />
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
                      <ProBookingItem
                        item={item}
                        handleCancelBooking={handleCancelBooking}
                      />
                    </Box>
                  );
                })}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Layout>
  );
}

export default ProBookingsScreen;
