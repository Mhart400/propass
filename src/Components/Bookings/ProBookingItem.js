import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";
import BookingItemDateTimePrice from "./BookingItemDateTimePrice";
import BookingItemClients from "./BookingItemClients";

function BookingItem({ item, handleCancelBooking }) {
  return (
    <Card
      elevation={3}
      sx={{
        my: 2,
        minHeight: "200px",
        maxWidth: "800px",
        mx: "auto",
        ":hover": {
          backgroundColor: "background.default",
        },
      }}
      key={item.id}
    >
      <CardHeader title={item.studioName} sx={{ pt: 1, pb: 0 }} />

      <CardContent sx={{ py: 1, px: 2 }} disableRipple>
        <Grid container columns={12}>
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <Box
              component="img"
              src={item.mainImage}
              height={{ xs: "80px", sm: "100px" }}
              width="90%"
              maxWidth={{ xs: "110px", sm: "150px" }}
            />
          </Grid>
          <Grid container item xs={7} sm={7} md={8} lg={8}>
            <Grid container items columns={4}>
              <Grid item xs={4} sm={4} md={2}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", lineHeight: 1, pb: 1 }}
                >
                  Session Info:
                </Typography>
                <BookingItemDateTimePrice item={item} />
              </Grid>
              <Grid item xs={4} sm={4} md={2}>
                {item.clientList[0].name && <BookingItemClients item={item} />}
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" variant="outlined" color="info" sx={{ m: 1 }}>
          Message Owner
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={{ m: 1 }}
          onClick={() => handleCancelBooking(item)}
        >
          Cancel Session
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookingItem;
