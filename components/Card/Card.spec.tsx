import React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';
import { TestWrapper } from '../../TestWrapper';

it('Card renders correctly', () => {
  const tree = renderer
    .create(<TestWrapper>
      <Card renderingContext={{
        page: {
          renderings: [{
            settings: {
              DataSource: ''
            }
          }]
        },
        item: {
          id: '123',
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
      }} />
      </TestWrapper>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});