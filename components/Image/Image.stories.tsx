import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Image from '.';

export default {
  title: 'Image | CaptionedImage',
  component: Image,
} as Meta;

const Template: Story = (args) => <Image  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        image: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey",
          width: 600,
          height: 200,
        }
      }
    }
  }
};
