import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../pages/SignIn';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignIn />, div);
});

it('pushes buttons!', () => {
  const wrapper = shallow(
    <SignIn />
  );

  console.log(wrapper.debug());
  const button = wrapper.find("#clickME");
  button.simulate('click');
});