import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ children, to, activeStyle, inactiveStyle, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });




  return (
    
      <Link
        style={match ? activeStyle : inactiveStyle}
        to={to}
        {...props}
      >
        {children}
      </Link>
    
  );
}

export default CustomLink;
