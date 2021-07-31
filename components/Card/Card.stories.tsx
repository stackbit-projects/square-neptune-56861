import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Card from '.';

export default {
  title: 'Card | ManualNavigationPod',
  component: Card,
} as Meta;

const Template: Story = (args) => <Card  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "Lorem ipsum dolor sit amet",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus et velit vulputate elementum. Aenean euismod tortor id sapien accumsan, vel commodo metus luctus. Mauris dapibus consectetur sem quis ultricies. Nam iaculis velit in tortor lobortis, in egestas augue facilisis. Fusce mattis pulvinar felis nec vulputate. Sed vulputate sem id nisi cursus, in ornare erat eleifend. Aliquam ut velit volutpat, volutpat nisi in, molestie nulla.",
        "pod image": {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
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
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "Component without link data",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus et velit vulputate elementum. Aenean euismod tortor id sapien accumsan, vel commodo metus luctus. Mauris dapibus consectetur sem quis ultricies. Nam iaculis velit in tortor lobortis, in egestas augue facilisis. Fusce mattis pulvinar felis nec vulputate. Sed vulputate sem id nisi cursus, in ornare erat eleifend. Aliquam ut velit volutpat, volutpat nisi in, molestie nulla.",
        "pod image": {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
      }
    }
  }
};
export const Tertiary = Template.bind({});
Tertiary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        title: "Component without image data",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus et velit vulputate elementum. Aenean euismod tortor id sapien accumsan, vel commodo metus luctus. Mauris dapibus consectetur sem quis ultricies. Nam iaculis velit in tortor lobortis, in egestas augue facilisis. Fusce mattis pulvinar felis nec vulputate. Sed vulputate sem id nisi cursus, in ornare erat eleifend. Aliquam ut velit volutpat, volutpat nisi in, molestie nulla.",
        link: {
          url: "/",
          text: "button text"
        }
      }
    }
  }
};