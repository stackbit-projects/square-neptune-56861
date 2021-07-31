import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import HeroSecondary from '.';

export default {
  title: 'HeroSecondary | SecondaryHero',
  component: HeroSecondary,
} as Meta;

const Template: Story = (args) => <HeroSecondary  {...args} />;

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
        herotitle: "Monkey Business",
        herofocalpoint: "35% 26%"
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
        herotitle: "No Image",
        herofocalpoint: "35% 26%"
      }
    }
  }
};
