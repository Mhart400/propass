import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import Message from "./Message";

function Conversation({ convo }) {
  const { userProfile } = useAuth();

  const [recipient, setRecipient] = useState();

  useEffect(() => {
    if (convo.user1.userId === userProfile.id) {
      console.log(`Recipient = ${JSON.stringify(recipient)}`)
      setRecipient(convo.user2);
    } else {
      setRecipient(convo.user1);
    }
  }, []);

  return (
    <Box >
      {recipient && convo.messages.map((message) => {
        const fromMe = message.userId === userProfile.id;
        return (
          <Message
            message={message}
            avatarUrl={fromMe ? userProfile.avatarUrl : recipient.avatarUrl}
            name={`${recipient.firstName} ${recipient.lastName}`}
            fromMe={message.userId === userProfile.id}
          />
        );
      })}
    </Box>
  );
}

export default Conversation;
