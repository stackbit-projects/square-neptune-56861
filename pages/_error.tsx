import React from "react";
import { ThemeProvider } from "styled-components";
import {
  BasePlaceholder,
  PageComponent,
  UniformContext,
  NextPageProps,
  getNextPageProps,
  createConsoleLogger,
} from "@uniformdev/next";
import { UniformContextProps } from "@uniformdev/common-client";

import uniformConfig from "../uniform.config";
const context: UniformContextProps = uniformConfig();
context.logger = context.logger || createConsoleLogger();

import { theme } from "../theme";

// Components Index
const componentsIndex: any = {};

class Placeholder extends BasePlaceholder {
  constructor(props) {
    super(props, componentsIndex, createConsoleLogger(), context.options);
  }
}

componentsIndex.Placeholder = Placeholder;

// Page
export default class extends React.Component<NextPageProps> {
  static async getInitialProps(arg: any) {
    return await getNextPageProps(arg);
  }
  render() {
    return (
      <UniformContext.Provider value={context}>
        <ThemeProvider theme={theme}>
          <PageComponent {...this.props} components={componentsIndex}>
            {(renderingContext) => (
              <Placeholder
                placeholderKey="/"
                renderingContext={renderingContext}
              />
            )}
          </PageComponent>
        </ThemeProvider>
      </UniformContext.Provider>
    );
  }
}

export async function getStaticProps(context) {
  const host = process.env.UNIFORM_API_URL;
  const siteName = process.env.UNIFORM_API_SITENAME;
  const url = `${host}/content/uniform/api/content/${siteName}/page/404.json`;
  const res = await fetch(url);
  const pageData = await res.json();
  return {
    props: {
      pageData,
    },
  };
}
