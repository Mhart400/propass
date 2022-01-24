import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "../../Components/Layout/Layout";
import PageTitle from "../../Components/Layout/PageTitle";
import useFirestore_Bookings from "../../hooks/useFirestore_Bookings";
import { format } from "date-fns";
import BookingItem from "../../Components/Bookings/BookingItem";

function ProBookingsScreen() {
  const { retrieveBookings } = useFirestore_Bookings();
  const [bookings, setBookings] = useState();

  useEffect(() => {
    retrieveBookings(setBookings);
  }, []);

  return (
    <Layout>
      <PageTitle>Booked Sessions</PageTitle>
      <Box sx={{ py: 1 }}>
        {bookings &&
          bookings.map((item) => {
            return (
              <Box sx={{ width: "100%" }}>
                <BookingItem item={item} />
              </Box>
            );
          })}
      </Box>
    </Layout>
  );
}

export default ProBookingsScreen;
