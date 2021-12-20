import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMain from "./Components/Header_Footer/HeaderMain";
import HomeScreen from "./Screens/HomeScreen";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import { AuthProvider } from "./Context/AuthContext";
import OwnerHomeScreen from "./Screens/OwnerScreens/OwnerHomeScreen";
import OwnerRoute from "./Route/OwnerRoute";
import ProRoute from "./Route/ProRoute";
import ProHomeScreen from "./Screens/ProScreens/ProHomeScreen";

function App() {
  return (
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
              <Route exact path="/owner/dashboard" element={<OwnerHomeScreen />} />
            </Route>
            <Route path="/pro" element={<ProRoute />}>
              <Route exact path="/pro/dashboard" element={<ProHomeScreen />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
