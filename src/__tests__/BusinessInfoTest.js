import React from 'react';
import ReactDOM from 'react-dom';
import BusinessInfo from '../components/BusinessInfo';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProvider from "../firebase/auth-provider";

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessInfo />, div);
});

it('pushes buttons!', () => {
  const wrapper = shallow(
    <BusinessInfo />
  );
  console.log(wrapper.debug());
  const button = wrapper.find("#clickMEEE");
  button.simulate('click');
});