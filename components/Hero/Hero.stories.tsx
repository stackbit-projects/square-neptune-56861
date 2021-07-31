import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Hero from '.';

export default {
  title: 'Hero | PrimaryHero',
  component: Hero,
} as Meta;

const Template: Story = (args) => <Hero  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        herotitle: "We&#39;re here to help children like Jane Doe",
        herosummarycopy: "Lorem&#39;s ipsum dolor sit amet, consectetur adipiscing elit.",
        heroimage: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
        heroctabuttonlink: {
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
        herotitle: "Component without link data",
        herosummarycopy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        heroimage: {
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
        herotitle: "Component without image data",
        herosummarycopy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        heroctabuttonlink: {
          url: "/",
          text: "button text"
        }
      }
    }
  }
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        herotitle: "Component without summary data",
        heroimage: {
          url: "https://img.posterlounge.co.uk/images/big/1592909.jpg",
          alt: "cute monkey"
        },
        heroctabuttonlink: {
          url: "/",
          text: "button text"
        }
      }
    }
  }
};