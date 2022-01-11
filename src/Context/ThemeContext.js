import React, { useContext, useState, useEffect } from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, deepOrange } from "@mui/material/colors";


export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {main: blue[900]},
            secondary: {main: '#e82b3c'},
            background: {
              default: '#F9F9F9'
            },
            header: {primary: '#121212'},
            red1: {primary: blue},

          }
        : {
            // palette values for dark mode
            primary: {main: '#e82b3c'},
            secondary: blue,
            header: {primary: '#ffffff'}
            

          }),
    },
  });