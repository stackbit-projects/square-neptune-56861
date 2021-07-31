import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import EventCard from '.';

export default {
  title: 'Event Card',
  component: EventCard,
} as Meta;

const Template: Story = (args) => <EventCard  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        status: "",
        title: "London Landmark Half Marathon",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur pulvinar malesuada. Mauris dapibus tortor sed iaculis consequat. Curabitur iaculis massa ac.",
        "pod image": {
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

export const Full = Template.bind({});
Full.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        status: "full",
        title: "London Landmark Half Marathon",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur pulvinar malesuada. Mauris dapibus tortor sed iaculis consequat. Curabitur iaculis massa ac.",
        "pod image": {
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

export const Cancelled = Template.bind({});
Cancelled.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        status: "cancelled",
        title: "London Landmark Half Marathon",
        "pod text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur pulvinar malesuada. Mauris dapibus tortor sed iaculis consequat. Curabitur iaculis massa ac.",
        "pod image": {
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
