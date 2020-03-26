import React from 'react';
//import { render } from '@testing-library/react';
import App from './App';
import Home from './home/home';
import Enzyme, {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })


test('should have Home component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Home).length).toEqual(1);
});
