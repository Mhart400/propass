import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMain from "./Components/Header_Footer/HeaderMain";
import HomeScreen from "./Screens/HomeScreen";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import { AuthProvider } from "./Context/AuthContext";
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
                </Route>
                <Route
                  exact
                  path={`/proDetail/:userId`}
                  element={<ProDetailScreen />}
                />
              </Routes>
              <FooterMain />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
