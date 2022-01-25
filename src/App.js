import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMain from "./Components/Header_Footer/HeaderMain";
import HomeScreen from "./Screens/HomeScreen";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import OwnerDashboardScreen from "./Screens/OwnerScreens/OwnerDashboardScreen";
import OwnerProfileScreen from "./Screens/OwnerScreens/OwnerProfileScreen";
import OwnerRoute from "./Route/OwnerRoute";
import ProRoute from "./Route/ProRoute";
import ProDashboardScreen from "./Screens/ProScreens/ProDashboardScreen";
import ProProfileScreen from "./Screens/ProScreens/ProProfileScreen";
import FooterMain from "./Components/Header_Footer/FooterMain";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext, getDesignTokens } from "./Context/ThemeContext";
import ProDetailScreen from "./Screens/ProScreens/ProDetailScreen";
import StudioDetailScreen from "./Screens/StudioScreens/StudioDetailScreen";
import CheckoutScreen from "./Screens/CheckoutScreen";
import { SnackbarProvider } from "notistack";
import { Slide, Box } from "@mui/material";
import ProBookingsScreen from "./Screens/ProScreens/ProBookingsScreen";
import OwnerBookingsScreen from "./Screens/OwnerScreens/OwnerBookingsScreen";

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              TransitionComponent={Slide}
            >
              <BrowserRouter>
                <div
                  className="App"
                  style={{
                    height: "100%",
                    // height: "calc(100vh - 64px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <HeaderMain />
                    <Routes>
                      <Route exact path="/" element={<HomeScreen />} />
                      <Route path="/signup" element={<SignupScreen />} />
                      <Route path="/login" element={<LoginScreen />} />
                      
                      <Route element={<OwnerRoute />}>
                        <Route
                          exact
                          path="/owner/dashboard"
                          element={<OwnerDashboardScreen />}
                        />
                        <Route
                          exact
                          path="/owner/profile"
                          element={<OwnerProfileScreen />}
                        />
                        <Route
                          exact
                          path="/owner/bookings"
                          element={<OwnerBookingsScreen />}
                        />
                      </Route>

                      <Route path="/pro" element={<ProRoute />}>
                        <Route
                          exact
                          path="/pro/dashboard"
                          element={<ProDashboardScreen />}
                        />
                        <Route
                          exact
                          path="/pro/profile"
                          element={<ProProfileScreen />}
                        />
                        <Route
                          exact
                          path={`/pro/checkout`}
                          element={<CheckoutScreen />}
                        />
                        <Route
                          exact
                          path={`/pro/bookings`}
                          element={<ProBookingsScreen />}
                        />
                      </Route>

                      <Route
                        exact
                        path={`/proDetail/:userId`}
                        element={<ProDetailScreen />}
                      />
                      <Route
                        exact
                        path={`/studioDetail/:studioId`}
                        element={<StudioDetailScreen />}
                      />
                    </Routes>
                  <FooterMain />
                </div>
              </BrowserRouter>
            </SnackbarProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
