import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CardArticle from '.';

export default {
  title: 'CardArticle | CaseStudySpotlight',
  component: CardArticle,
} as Meta;

const Template: Story = (args) => <CardArticle  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "Lorem ipsum",
        summary: "Lorem ipsum dolor sit amet",
        image: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey",
          width: 600,
          height: 200,
        },
        link: {
          url: "/",
          text: "read more"
        }
      }
    }
  }
};


export const Secondary = Template.bind({});
Secondary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "No image",
        summary: "Lorem ipsum dolor sit amet",
        link: {
          url: "/",
          text: "read more"
        }
      }
    }
  }
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "No link",
        summary: "Lorem ipsum dolor sit amet",
        image: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey",
          width: 600,
          height: 200,
        },
      }
    }
  }
};
