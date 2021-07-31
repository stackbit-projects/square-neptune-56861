import React from 'react'
import { ThemeProvider } from 'styled-components';
import { theme } from "../theme"
import "../styles/core.scss"


export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
