import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMain from "./Components/HeaderMain";
import HomeScreen from "./Screens/HomeScreen";
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import { AuthProvider } from "./Context/AuthContext";
import OwnerHomeScreen from "./Screens/OwnerHomeScreen";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderMain />
        <div
          className="App"
          style={{
            height: "calc(100vh - 69px",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/ownerHome" element={<OwnerHomeScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
