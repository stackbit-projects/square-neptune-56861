import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import TextBanner from '.';

export default {
  title: 'TextBanner | PromoPod',
  component: TextBanner,
} as Meta;

const Template: Story = (args) => <TextBanner  {...args}  />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext:{
    id: '1234', 
    item: {
      fields: {
        text: "Lorem ipsum dolor sit amet",
        link: {
          url: "/",
          text: "button text"
        }
      }
    }
  }
};

export const Secondary = Template.bind({});
Secondary.args = {
  renderingContext:{
    id: '1234', 
    item: {
      fields: {
        text: "Component without link data",
      }
    }
  }
};