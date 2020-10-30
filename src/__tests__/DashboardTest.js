import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../pages/Dashboard';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
});

it('pushes buttons!', () => {
  const wrapper = shallow(
    <Dashboard />
  );

  console.log(wrapper.debug());
  var button = wrapper.find("#clickOne");
  button.simulate('click');
  button = wrapper.find("#clickTwo");
  button.simulate('click');
  button = wrapper.find("#clickThree");
  button.simulate('click');
});