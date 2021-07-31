import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Video from '.';

export default {
  title: 'Video | Video',
  component: Video,
} as Meta;

const Template: Story = (args) => <Video  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        youtubemovie: "BVauYzq0BgE",
        moviecaption: "Lorem ipsum dolor sit amet",
      }
    }
  }
};

