import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import BlockQuote from '.';

export default {
  title: 'BlockQuote | Quote',
  component: BlockQuote,
} as Meta;

const Template: Story = (args) => <BlockQuote  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        "quote text": "B to the A to the N. Banana for life, lorem ipsum dolor sit",
        author: "Monkey Business, LA"
      }
    }
  }
};
