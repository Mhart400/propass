import React, { useState, useEffect } from "react";

// Component Styping
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./theme";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// FIREBASE IMPORTS
import useFirebase from "./Actions/useFirebase";
import { onAuthStateChanged } from "firebase/auth";

// SCREEN IMPORTS
import AuthLandingScreen from "./Components/Screens/Auth/AuthLandingScreen";
import LoadingWhite from "./Components/Utilities/LoadingWhite";
import Signup from "./Components/Screens/Auth/SignupScreen";
import Login from "./Components/Screens/Auth/LoginScreen";
import MainScreen from "./Components/Screens/Main/MainScreen";
import ProfileScreen from "./Components/Screens/Main/account/ProfileScreen";
import MyStudiosScreen from "./Components/Screens/Main/account/MyStudiosScreen";
import MyTrainingScreen from "./Components/Screens/Main/account/MyTrainingScreen";
import ManagePasswordScreen from "./Components/Screens/Main/account/ManagePasswordScreen";

//REDUX
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store";

export default function App() {
  const { auth } = useFirebase();

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);
  const Stack = createNativeStackNavigator();

  if (!loaded) {
    return (
      <PaperProvider theme={theme}>
        <LoadingWhite />
      </PaperProvider>
    );
  }

  if (loaded && !loggedIn) {
    return (
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLanding">
              <Stack.Screen
                name="AuthLanding"
                component={AuthLandingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    );
  }
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainLanding">
            <Stack.Screen
              name="MainLanding"
              component={MainScreen}
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="EditProfile"
              component={ProfileScreen}
              options={{ headerShown: true, title: "Manage Profile" }}
            />
            <Stack.Screen
              name="EditStudios"
              component={MyStudiosScreen}
              options={{ headerShown: true, title: "My Studios" }}
            />
            <Stack.Screen
              name="EditTraining"
              component={MyTrainingScreen}
              options={{ headerShown: true, title: "My Training" }}
            />
            <Stack.Screen
              name="EditPassword"
              component={ManagePasswordScreen}
              options={{ headerShown: true, title: "Manage Password" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
