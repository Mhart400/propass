import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


function OwnerRoute() {
  const { currentUser, userProfile } = useAuth();
  console.log(`currentUser = ${JSON.stringify(currentUser)}`);
  console.log(`userProfile = ${JSON.stringify(userProfile)}`)
  
  //Logic for Routing
  if (currentUser && userProfile['isOwner'] === true) {
    return <Outlet />;
  } else {
    return (
      <div>
        <Navigate to="/" />
      </div>
    );
  }
}
export default OwnerRoute;