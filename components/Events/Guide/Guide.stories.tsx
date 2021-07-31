import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import EventGuide from '.';

export default {
  title: 'Event guide',
  component: EventGuide,
} as Meta;

const Template: Story = (args) => <EventGuide  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "Event guide",
        "text": "Lorem ipsum dolor sit amet,  asd asd consectetur adipiscing elit, sed do sd eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ads minim veniam, quis nostrudsadasdasd exercitation ullamco laboris nisi utas aliquip ex ea commodo consequat. minim veniam, quis nostruddddsssasa exercitation ullamco laboris nisi utd",
        "image": {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
        link: {
          url: "/",
        }
      }
    }
  }
};

