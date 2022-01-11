import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Box} from '@mui/material'
import {useTheme} from '@mui/material/styles'

function CustomLink({ children, to, activeStyle, inactiveStyle, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });


 const theme = useTheme()
 console.log(`THEME MODE = ${theme.palette.mode}`)
  return (
    // {/* <Link */}
    <Box component={Link}

        style={match ? activeStyle : inactiveStyle }
        sx={{color: theme.palette.header.primary}}
        
        to={to}
        {...props}
        >
        {children}
        </Box>
      // {/* </Link> */}
    
  );
}

export default CustomLink;
