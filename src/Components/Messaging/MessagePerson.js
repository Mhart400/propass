import React from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

function MessagePerson({ person, isActive }) {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottomColor: "#3b437125",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        // overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1.5,
          px: 1,
          bgcolor: isActive ? "primary.dark" : "background.default",
        }}
        selected={isActive}
      >
        <Avatar src={person.avatarUrl} sx={{ height: "50px", width: "50px" }} />
        <Box
          sx={{overflowX: 'hidden'}}
        >
          <Typography
            sx={{
              ml: 2,
              lineHeight: '1.2',
              color: isActive ? "#fff" : "text.primary",
              fontWeight: isActive && "bold",
            }}
            variant="body1"
            noWrap
          >{`${person.firstName} ${person.lastName}`}</Typography>
          <Typography sx={{ml: 2, color: isActive ? "#fff" : "text.primary",}} variant="body2">{person.role}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MessagePerson;
