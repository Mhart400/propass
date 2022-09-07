import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import useFirebase from "../../../Actions/useFirebase";

// Screens
import HomeScreen from "./home/HomeScreen";
import AccountMainScreen from "./account/AccountMainScreen";
import SessionsScreen from "./sessions/SessionsScreen";
import ClientsScreen from "./clients/ClientsScreen";
import MessagesScreen from "./messges/MessagesScreen";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MainScreen({ theme, navigation }) {
  const Tab = createBottomTabNavigator();
  const { auth } = useFirebase();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#F6F6F6",
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#B6B6B6",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        options={{
          tabBarLabel: "Sessions",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#B6B6B6",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientsScreen}
        options={{
          tabBarLabel: "Clients",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#B6B6B6",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#B6B6B6",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountMainScreen}
        options={{
          headerShown: true,
          tabBarLabel: "Account",
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#B6B6B6",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Account", {
              params: {
                uid: auth.currentUser.uid,
              },
            });
          },
        })}
      />
    </Tab.Navigator>
  );
}
