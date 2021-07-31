import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Accordion from '.';

export default {
  title: 'Accordion | Accordion',
  component: Accordion,
} as Meta;

const Template: Story = (args) => <Accordion  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      children: [
        {
          fields: {
            heading: "title",
            content: "lorem ipsum dolor sit"
          }
        },
        {
          fields: {
            heading: "title2",
            content: "lorem ipsum dolor sit"
          }
        }
      ]
    }
  }
};
