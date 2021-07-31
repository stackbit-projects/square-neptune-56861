import {css} from "styled-components"

export const theme = {
  colors: {
    black: "#131E29",
    white: "#FFFFFF",
    offWhite: "#F6F6F6",
    grey: "#ebebeb",
    greyLight: "#F5F5F5",
    disabled: "#51585F",
    primary: "#002C5C",
    primaryLight: "#7CD2FF",
    primaryLightest: "#E0F4FF",
    secondary: "#FDDF7F",
    error: "#DE232F"
  },
  breakpoints: {
    sm: "@media all and (min-width: 40em)",
    md: "@media all and (min-width:60em)"
  }
}

export const maxInputWidth = 735

export const typography = {
  h1: css`
    font-size: 50px;
    line-height: 58px;
    font-family: "castledown-heavy";
  `,
  h2: css`
    font-size: 34px;
    line-height: 44px;
    font-family: "castledown-bold";
  `,
  h3: css`
    font-size: 26px;
    line-height: 36px;
    font-family: "castledown-bold";
  `,
  h4: css`
    font-size: 22px;
    line-height: 32px;
    font-family: "castledown-bold";
  `,
  h5: css`
    font-size: 20px;
    line-height: 32px;
    font-family: "castledown-heavy";
  `,
  body: css`
    font-size: 18px;
    line-height: 26px;
    font-family: "castledown-regular";
  `,
  link: css`
    font-size: 20px;
    line-height: 26px;
    font-family: "castledown-bold";
  `
}