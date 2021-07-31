import React from 'react'
import { GlobalStyle } from "../styles/global-styles"
import "../styles/core.scss"
import "../scripts/all"

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle whiteColor />
      <Component {...pageProps} />
    </React.Fragment>
  )
}