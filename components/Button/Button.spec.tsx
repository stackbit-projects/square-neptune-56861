import React from 'react';
import renderer from 'react-test-renderer';
import Button from '.';
import { TestWrapper } from '../../TestWrapper';

it('Button renders correctly', () => {
  const tree = renderer
    .create(<TestWrapper>
      <Button renderingContext={{
        page: {
          renderings: [{
            settings: {
              DataSource: ''
            }
          }]
        },
        item: {
          id: 'test',
          fields: {
            link: {
              url: "/",
              text: "click me"
            }
          }
        }
      }} />
    </TestWrapper>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});