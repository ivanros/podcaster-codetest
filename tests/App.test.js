import { shallow } from 'enzyme';
import React from 'react';
import App from '../src/app';

it('renders without crashing', () => {
  shallow(<App />);
});
