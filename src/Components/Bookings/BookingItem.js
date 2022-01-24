import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Card,
  CardActionArea,
} from "@mui/material";
import BookingItemDateTime from "./BookingItemDateTime";
import { format } from "date-fns";

const localeStringOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function BookingItem({ item }) {
  return (
    <Card
      elevation={3}
      sx={{
        my: 2,
        minHeight: "120px",
        maxWidth: "800px",
        mx: "auto",
      }}
      key={item.id}
    >
      <CardActionArea sx={{ py: 1, px: 2 }} disableRipple >
        <Grid container columns={12}>
          <Grid item xs={4} sm={4} md={3} lg={3}>
            <Typography variant="h6">{item.studioName}</Typography>
            <Box
              component="img"
              src={item.mainImage}
              height={{ xs: "80px", sm: "100px" }}
              width="90%"
              maxWidth={{ xs: "110px", sm: "150px" }}
            />
          </Grid>
          <Grid item xs={8} sm={8} md={6} lg={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", pt: 1 }}>
              Session Info:
            </Typography>
            <BookingItemDateTime item={item} />
            <Typography variant="body2">
              Price: $
              {Number(item.totalPrice).toLocaleString(
                "en",
                localeStringOptions
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box
              sx={{
                //   visibility: { md: "hidden", lg: "hidden", xl: "hidden" },
                display: "flex",
                flexDirection: { sm: "row", md: "column" },
                justifyContent: "flex-end",
                alignItems: { xs: "flex-end", md: "center" },
                py: 1,
                //   border: '1px solid teal',
              }}
            >
              <Button
                size="small"
                variant="outlined"
                color="info"
                sx={{ m: 1 }}
              >
                Message Owner
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                sx={{ m: 1 }}
              >
                Cancel Session
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default BookingItem;
