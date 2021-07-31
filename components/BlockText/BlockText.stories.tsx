import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import BlockText from '.';

export default {
  title: 'BlockText | MessageBlock',
  component: BlockText,
} as Meta;

const Template: Story = (args) => <BlockText  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        "message block": "<p>Lorem ipsum dolor sit amet</p>"
      }
    }
  }
};
