import React from "react";
import { Box, Typography, Grid, IconButton, Divider } from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import CartItem_DateTime from "./CartItem_DateTime";
import CartItem_Clients from "./CartItem_Clients";

const localeStringOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function CartItem({ item, handleDelete }) {
  return (
    <Box
      sx={{
        p: 1,
        "& :hover": { backgroundColor: "background.default" },
      }}
    >
      <Grid container columns={20}>
        <Grid
          // FIRST COLUMN
          item
          md={6}
          sm={7}
          xs={9}
        >
          <Typography variant="h6" color="primary">
            {item.studioName}
          </Typography>
          <Box sx={{ position: "relative", height: "50px", width: "65px" }}>
            <Box
              sx={{
                backgroundImage: `url(${item.mainImage})`,
                backgroundSize: "cover",
              }}
              height="100%"
              width="150%"
            />
          </Box>
          <Typography variant="subtitle2">{item.studioAddress}</Typography>
          <Typography variant="subtitle2">
            {item.studioCity}, {item.studioState} {item.studioZip}
          </Typography>
        </Grid>

        <Grid
          // SECOND COLUMN
          container
          item
          md={12}
          sm={11}
          xs={11}
        >
          <Grid container item columns={2}>
            <Grid item xs={2} sm={2} md={1} sx={{mb: 1}}>
              <CartItem_DateTime item={item} />
            </Grid>
            <Grid item xs={2} sm={2} md={1}>
              {item.clientList && item.clientList[0].name && (
                <CartItem_Clients item={item} />
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          // THIRD COLUMN
          item
          container
          md={2}
          sm={2}
          xs={20}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            // justifyContent: "space-between",
          }}
        >
          <Grid item container columns={10}>
            <Grid
              item
              xs={9}
              sm={10}
              md={10}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                // border: "1px solid red",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",

                  fontSize: { xs: "15px", md: "16px" },
                }}
              >
                $
                {Number(item.totalPrice).toLocaleString(
                  "en",
                  localeStringOptions
                )}
              </Typography>
            </Grid>

            <Grid
              item
              xs={1}
              sm={10}
              md={10}
              sx={{
                // border: "1px solid green",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ "& :hover": { color: "secondary.main" } }}
              >
                <DeleteIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ pt: 1 }} />
    </Box>
  );
}

export default CartItem;
