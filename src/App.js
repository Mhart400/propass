import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Screens/LandingPage"
import SignupScreen from'./Screens/SignupScreen'

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignupScreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
