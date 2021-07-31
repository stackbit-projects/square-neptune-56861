import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from 'styled-components'

// When Sitecore solution does not have personalization rules and when it does not require SPA-navigation
// it makes sense to disable all nextjs scripts to minimize javascript bundle and fit performance budget.

// CustomDocument replaces stock.js Document component to replace stock Head component

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            content="Guide Dogs: Providing mobility for the blind and partially sighted. Supporting research, raising awareness and campaigning for the visually impaired. We will not rest until people who are blind or partially sighted can enjoy the same freedom of movement as everyone else."
            name="description"
          />
          <meta
            content="Guide Dogs: Providing mobility for the blind and partially sighted. Supporting research, raising awareness and campaigning for the visually impaired"
            property="og:description"
          />
          <meta content="128733004236479" property="fb:app_id" />
          <meta content="website" property="og:type" />
          <meta content="Guide Dogs Site" property="og:site_name" />
          <meta
            content="https://www.guidedogs.org.uk:443/-/media/Project/GuideDogs/GuideDogsDotOrg/Images/opengraph/homepage/Black-labrador-looks-up-at-camera.jpg"
            property="og:image"
          />

          <script src="https://polyfill.io/v3/polyfill.min.js?features=Object.keys"></script>

          {/* @ts-ignore */}
          {this.props.styleTags}
        </Head>
        <body className="default-device">
          <Main />
          <NextScript />
          <script src="/scripts/core-optimized-min.js"></script>
          <script src="/scripts/xa-optimized-min.js"></script>
          <script src="/scripts/theme-optimized-min.js"></script>
          <script src="/scripts/google-maps-optimized-min.js"></script>
          <script src="/scripts/maps-optimized-min.js"></script>
          <script src="/scripts/search-optimized-min.js"></script>
          <script src="/scripts/components-optimized-min.js"></script>

          <script src="/scripts/custom/scripts.js"></script>
        </body>
      </Html>
    );
  }
}
