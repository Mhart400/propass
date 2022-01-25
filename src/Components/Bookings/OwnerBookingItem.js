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
  Avatar,
} from "@mui/material";
import BookingItemDateTimePrice from "./BookingItemDateTimePrice";
import BookingItemClients from "./BookingItemClients";

function OwnerBookingItem({ item }) {
  return (
    <Card
      elevation={3}
      sx={{
        my: 2,
        minHeight: "150px",
        maxWidth: "800px",
        mx: "auto",
        ":hover": {
          backgroundColor: "background.default",
        },
      }}
      key={item.id}
    >
      <CardHeader
        title={
          <Typography variant="body1" sx={{fontWeight: 'bold'}}>{`${item.proFirstName} ${item.proLastName}`}</Typography>
        }
        subheader={<Typography variant="body2">{item.proEmail}</Typography>}
        avatar={
          <Avatar
            src={item.proAvatarUrl}
            sx={{ height: "50px", width: "50px" }}
          />
        }
        sx={{ py: 1, px: 2 }}
        action={
          <Button size="small" variant="outlined" color="info" sx={{ m: 1 }}>
            Message Pro
          </Button>
        }
      />
      <CardContent sx={{ py: 1, px: 2 }} disableRipple>
        <Grid container columns={12}>
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                component="img"
                src={item.mainImage}
                height={{ xs: "80px", sm: "100px" }}
                width="90%"
                maxWidth={{ xs: "110px", sm: "150px" }}
              />
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{`${item.studioName}`}</Typography>
            </Box>
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
    </Card>
  );
}

export default OwnerBookingItem;
