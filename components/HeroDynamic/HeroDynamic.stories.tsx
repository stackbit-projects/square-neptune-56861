import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import HeroDynamic from '.';

export default {
  title: 'HeroDynamic',
  component: HeroDynamic,
} as Meta;

const Template: Story = (args) => <HeroDynamic  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        heroimage: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
        herotitle: "Thank you, #NAME#!",
        herofocalpoint: "35% 26%"
      }
    }
  }
};
