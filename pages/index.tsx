import React from "react";
import { ThemeProvider } from "styled-components";
import loadable from '@loadable/component'
// Uniform
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
import { theme } from "../theme";


const context: UniformContextProps = uniformConfig();
context.logger = context.logger || createConsoleLogger();

import MVCLayout from '../components/Layout'
import CardComponent from '../components/Card'
import TextBannerComponent from '../components/TextBanner'
import CardBannerComponent from '../components/CardBanner'
import ContactDetailsComponent from '../components/ContactDetails'
import BlockTextComponent from '../components/BlockText'
import CardArticleComponent from '../components/CardArticle'
import ContentComponent from '../components/Content'
import CampaignSearchComponent from '../components/CampaignSearch'
import BlockQuoteComponent from '../components/BlockQuote'

const LoaderComponent = () => <div />
const BrowserTitle = loadable(() => import('../components/Meta/BrowserTitle'))

const HeroComponent = loadable(() => import('../components/Hero'), {
  fallback: <div className="c-hero c-hero--primary" style={{ height: 560 }} />,
})
const HeroSecondaryComponent = loadable(() => import('../components/HeroSecondary'), {
  fallback: <div className="c-hero c-hero--secondary" style={{ height: 500 }} />,
})
const DynamicHeroComponent = loadable(() => import('../components/HeroDynamic'), {
  fallback: <div className="c-hero c-hero--secondary" style={{ height: 500 }} />,
})


const ButtonComponent = loadable(() => import('../components/Button'), {
  fallback: <div style={{ height: 56 }} />,
})
const ImageComponent = loadable(() => import('../components/Image'), {
  fallback: <div style={{ height: 441 }} />,
})
const VideoComponent = loadable(() => import('../components/Video'), {
  fallback: LoaderComponent
})
const CookiePreferencesComponent = loadable(() => import('../components/CookiePreferences'), {
  fallback: LoaderComponent
})
const DividerComponent = loadable(() => import('../components/Divider'), {
  fallback: LoaderComponent
})
const MetadataLayout = loadable(() => import('../components/MetadataLayout'), {
  fallback: LoaderComponent
})
const FormComponent = loadable(() => import('../components/Form'), {
  fallback: LoaderComponent
})

const ThankYouComponent = loadable(() => import('../components/ThankYou/Event'), {
  fallback: LoaderComponent
})

const EventDetailsComponent = loadable(() => import('../components/Events/Details'), {
  fallback: LoaderComponent
})

const CapacityBannerComponent = loadable(() => import('../components/CapacityBanner'), {
  fallback: LoaderComponent
})

const JustGivingComponent = loadable(() => import('../components/JustGiving'), {
  fallback: LoaderComponent
})


// Components Index
const componentsIndex: any = {};

componentsIndex["PrimaryHero"] = HeroComponent;
componentsIndex["PromoPod"] = TextBannerComponent;
componentsIndex["ManualNavigationPod"] = CardComponent;
componentsIndex["ImageSpotlight"] = CardBannerComponent;
componentsIndex["GetInTouch"] = ContactDetailsComponent;
componentsIndex["CTAButton"] = ButtonComponent;
componentsIndex["MessageBlock"] = BlockTextComponent;
componentsIndex["Quote"] = BlockQuoteComponent;
componentsIndex["SecondaryHero"] = HeroSecondaryComponent;
componentsIndex["CaptionedImage"] = ImageComponent;
componentsIndex["CaseStudySpotlight"] = CardArticleComponent;
componentsIndex["Video"] = VideoComponent;
componentsIndex["MVCLayout"] = MVCLayout;
componentsIndex["MetadataLayout"] = MetadataLayout;
componentsIndex["CookiePreferences"] = CookiePreferencesComponent;
componentsIndex["Volunteeringsearchbox"] = CampaignSearchComponent;
componentsIndex["BrowserTitle"] = BrowserTitle;
componentsIndex["RichText"] = ContentComponent
componentsIndex["ReusableRichText"] = ContentComponent
componentsIndex["Divider"] = DividerComponent
componentsIndex["JavaScriptForm"] = FormComponent
componentsIndex["CapacityBanner"] = CapacityBannerComponent;

componentsIndex["FormThankyouhero"] = DynamicHeroComponent
componentsIndex["EventsSection"] = EventDetailsComponent
componentsIndex["EventGuide"] = () => <div />
componentsIndex["EventGuideItem"] = () => <div />
componentsIndex["EventsThankyou"] = ThankYouComponent
componentsIndex["JustGiving"] = JustGivingComponent

class Placeholder extends BasePlaceholder {
  constructor(props) {
    super(props, componentsIndex, createConsoleLogger(), context.options);
    if (props?.renderingContext?.item?.renderings?.some(rendering => rendering?.renderingType === "JavaScriptRendering") &&
      Object.values(props?.renderingContext?.item?.fields).some(value => value && typeof value === "string" && value.indexOf("{\"commands\":") > -1)) {
        throw new Error('Uniform - corrupt content from EE bug.');
    }
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
      <>
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
      </>
    );
  }
}
