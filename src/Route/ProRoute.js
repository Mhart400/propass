import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


function ProRoute() {
  const { currentUser, userProfile } = useAuth();
  console.log(`currentUser = ${JSON.stringify(currentUser)}`);
  console.log(`userProfile = ${JSON.stringify(userProfile)}`)
  
  //Logic for Routing
  if (currentUser && userProfile['isPro'] === true) {
    return <Outlet />;
  } else {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  }
}
export default ProRoute;
