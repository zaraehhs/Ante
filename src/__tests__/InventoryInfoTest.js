import React from 'react';
import ReactDOM from 'react-dom';
import InventoryInfo from '../components/InventoryInfo';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InventoryInfo />, div);
});

it('pushes buttons!', () => {
  const wrapper = shallow(
    <InventoryInfo />
  );

  console.log(wrapper.debug());
  var button = wrapper.find("#CLICKPLS");
  button.simulate('click');
});