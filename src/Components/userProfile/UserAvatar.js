import React, { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import useFirestore from "../../hooks/useFirestore";

function UserAvatar({ height, width, sx }) {
  const { userProfile } = useAuth();
  const { retrieveDocs } = useFirestore();
  
  const [avatarImage, setAvatarImage ] = useState()

  useEffect(() => {
    retrieveDocs(userProfile.id, "Avatar", setAvatarImage)
  }, [])

  function stringToColor(string) {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: height,
        width: width,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...sx }}>
      {!avatarImage || avatarImage.length === 0 && <Avatar sx={{height: height, width: width}}>PP</Avatar>}
      {avatarImage && avatarImage.length > 0 && <Avatar
        {...stringAvatar(`${userProfile.firstName} ${userProfile.lastName}`)}
        src={avatarImage[0].url}
      />}
      
    </Box>
  );
}

export default UserAvatar;
