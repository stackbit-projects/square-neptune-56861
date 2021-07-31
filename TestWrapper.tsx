import React from 'react';
import { ThemeProvider } from "styled-components";
import { theme } from './theme';

export const TestWrapper = (props) => {
 return (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
 )
}
