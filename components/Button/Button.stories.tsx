import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from '.';

export default {
  title: 'Button | CTAButton',
  component: Button,
} as Meta;

const Template: Story = (args) => <Button  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        link: {
          url: "/",
          text: "click me"
        }
      }
    }
  }
};
