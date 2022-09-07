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
import ManageBillingScreen from "./Components/Screens/Main/account/ManageBillingScreen";

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
            <Stack.Screen // THIS IS THE MAIN TABS
              name="MainLanding"
              component={MainScreen}
              options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "Profile",
                headerShown: true,
                headerBackTitle: "Account",
              }}
            />
            <Stack.Screen
              name="Studios"
              component={MyStudiosScreen}
              options={{
                headerShown: true,
                title: "Studios",
                headerBackTitle: "Account",
              }}
            />
            <Stack.Screen
              name="Training"
              component={MyTrainingScreen}
              options={{
                headerShown: true,
                title: "Training",
                headerBackTitle: "Account",
              }}
            />
            <Stack.Screen
              name="Password"
              component={ManagePasswordScreen}
              options={{
                headerShown: true,
                title: "Password",
                headerBackTitle: "Account",
              }}
            />
            <Stack.Screen
              name="Billing"
              component={ManageBillingScreen}
              options={{
                headerShown: true,
                title: "Billing",
                headerBackTitle: "Account",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
