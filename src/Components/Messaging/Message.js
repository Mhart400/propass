import React, { useState, useEffect } from "react";
import { Box, Grid, Avatar, Typography, Paper } from "@mui/material";
import { format } from "date-fns";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import { useTheme } from "@mui/system";

function Message({ message, avatarUrl, name, fromMe }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {!fromMe && <Box sx={{ flexGrow: 1, minWidth: "15%" }}></Box>}
      <Paper
        sx={{
          my: 1,
          p: 0.5,
          pl: 1.5,
          display: "flex",
          flexShrink: 1,
          alignSelf: "flex-end",
          backgroundColor: fromMe
            ? alpha(theme.palette.primary.dark, 0.2)
            : alpha(theme.palette.secondary.light, 0.5),
        }}
      >
        {/* <Avatar
          src={avatarUrl}
          sx={{ width: "45px", height: "45px", my: 1, mr: 2 }}
        /> */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", pt: 0.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ mr: 2, color: "primary.dark", fontWeight: "bold" }}
            >
              {name}
            </Typography>
            <Box sx={{pr: 1}}>
              <Typography
                sx={{ fontSize: "10px", alignSelf: "flex-end" }}
                color="text.disabled"
              >
                {format(new Date(message.date), "E P")}
              </Typography>
              <Typography sx={{ fontSize: "10px" }} color="text.disabled">
                {format(new Date(message.date), "p")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ pb: 1 }}>
            <Typography variant="body2">{message.message}</Typography>
          </Box>
        </Box>
      </Paper>
      {fromMe && <Box sx={{ flexGrow: 1, minWidth: "15%" }}></Box>}
    </Box>
  );
}

export default Message;
