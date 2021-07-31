import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ContactDetails from '.';

export default {
  title: 'ContactDetails | GetInTouch',
  component: ContactDetails,
} as Meta;

const Template: Story = (args) => <ContactDetails  {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderingContext: {
    id: '1234',
    item: {
      fields: {
        getintouchtitle: "Contact us",
        getintouchcopy: "Lorem&#39;s ipsum dolor sit amet, consectetur adipiscing elit.",
      
        getintouchtelephonetext: '01231 2442 3234',
        getintouchemaillink: {
          url: "/",
          text: "email us"
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
        getintouchtitle: "No email",
        getintouchcopy: "Lorem&#39;s ipsum dolor sit amet, consectetur adipiscing elit.",
        getintouchtelephonetext: '01231 2442 3234',
        
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
        getintouchtitle: "No phone number",
        getintouchcopy: "Lorem&#39;s ipsum dolor sit amet, consectetur adipiscing elit.",
        getintouchemaillink: {
          url: "/",
          text: "email us"
        }
      }
    }
  }
};
