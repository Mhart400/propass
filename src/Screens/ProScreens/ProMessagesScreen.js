import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  MenuItem,
  List,
  Paper,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";
import MessagePerson from "../../Components/Messaging/MessagePerson";
import Message from "../../Components/Messaging/Message";
import Conversation from "../../Components/Messaging/Conversation";
import { useAuth } from "../../Context/AuthContext";

const persons = [
  {
    id: "1a1a1",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a2",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "Hart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a3",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a4",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a5",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a6",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a7",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a8",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1a9",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
  {
    id: "1a1b1",
    key: 1,
    role: "pro",
    firstName: "Michael",
    lastName: "AREALLYLONGLASTNAMEHart",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
  },
];

const conversations = [
  {
    id: "convo1",
    lastUpdate: new Date(),
    messages: [
      {
        message: "This is the message 1 this is a very long message intended to test the boundaries of the box. What else can I write in this one????  Well I can start on a few more things but not to be the dlaksmdlak mslkm lk",
        date: new Date(2021, 1, 2),
        id: "111msmdm32",
        userId: "LgDWMOAxVoUwnZ0BU7oY",
      },
      {
        message: "This is the message 1 this is a very long message intended to test the boundaries of the box. What else can I write in this one????  Well I can start on a few more things but not to be the dlaksmdlak mslkm lk",
        date: new Date(2021, 1, 3),
        id: "122msmdm32",
        userId: "notme"
      },
      {
        message: "This is the message 3",
        date: new Date(2021, 1, 4),
        id: "133msmdm32",
        userId: "notme"
      },
    ],
    user1: {
      userId: "LgDWMOAxVoUwnZ0BU7oY",
      firstName: "Michael",
      lastName: "Hart",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
    },
    user2: {
      userId: "notme",
      firstName: "Michael",
      lastName: "Hart",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/Studios%2FW9rDZcekJ3GXDyI70YeH%2FMainImage%2Fphoto-of-coffee-bean-in-coffee-grinding-machine-2819842.jpg?alt=media&token=9cb5373e-86b2-45d8-bc73-dee2e058343b",
    },
  },
  {
    id: "convo2",
    lastUpdate: new Date(2022, 1, 3),
    messages: [
      {
        message: "This is the message 1a",
        date: new Date(2021, 1, 2),
        id: "111msmdm32",
        userId: "LgDWMOAxVoUwnZ0BU7oY",
      },
      {
        message: "This is the message 2a",
        date: new Date(2021, 1, 3),
        id: "122msmdm32",
        userId: "notme2"
      },
      {
        message: "This is the message 3a",
        date: new Date(2021, 1, 4),
        id: "133msmdm32",
        userId: "LgDWMOAxVoUwnZ0BU7oY",
      },
    ],
    user1: {
      userId: "LgDWMOAxVoUwnZ0BU7oY",
      firstName: "Michael",
      lastName: "Hart",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/mhart400%40gmail.com%2FAvatar%2F3937_ad069.jpg?alt=media&token=1ff811ea-06bc-4bc5-93c4-119720fd2e13",
    },
    user2: {
      userId: "notme2",
      firstName: "Michael",
      lastName: "Hart",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/studiopro-d559e.appspot.com/o/Studios%2FfEriZlcj4RvRsEvIeUA0%2FMainImage%2Fcoffee_banner_01.jpg?alt=media&token=4765448b-566d-4ad1-947f-3fb14d2713d2",
    },
  },
];

function ProMessagesScreen() {
    const {userProfile} = useAuth()
    const [activeMessageId, setActiveMessageId] = useState();

  const setActiveChat = (id) => {
    setActiveMessageId(id);
  };

  const [personList, setPersonList] = useState()

  useEffect(() => {
      // update the list of people to be displayed in the left-side PersonList.js
      const sortedConversations = conversations.sort((a, b) => b.lastUpdate - a.lastUpdate);
      const persons = sortedConversations.map(convo => {
        if (convo.user1.userId === userProfile.id) {
            return convo.user2;
          } else {
            return convo.user1;
          }
      })
      console.log(persons)
      setPersonList(persons);

  }, [])
  
  return (
    <Layout>
      <Box sx={{ p: 1 }}></Box>
      <Paper elevation={3} sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Grid container columns={20}>
          <Grid item lg={6} md={6} sm={7} sx={{ p: 0, m: 0 }}>
            <Box
              sx={{
                p: 0,
                m: 0,
                width: "100%",
                overflowY: "auto",
                overflowX: 'hidden',
                maxHeight: "calc(100vh - 150px)",
              }}
            >
              {personList && personList.map((person) => {
                return (
                  <MenuItem
                    onClick={() => setActiveChat(person.userId)}
                    sx={{
                      p: 0,
                      m: 0,
                      width: "100%",
                    }}
                  >
                    <MessagePerson
                      person={person}
                      isActive={activeMessageId === person.userId}
                    />
                  </MenuItem>
                );
              })}
            </Box>
          </Grid>
          <Grid item lg={14} md={14} sm={13} sx={{p: 2, borderLeftColor: 'text.disabled', borderLeftStyle: 'solid', borderLeftWidth: '2px'}}>
            {conversations.map((convo) => {
              return <Conversation convo={convo} />;
            })}
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
}

export default ProMessagesScreen;
