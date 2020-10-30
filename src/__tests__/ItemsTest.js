import React from 'react';
import ReactDOM from 'react-dom';
import Items from '../inventoryComponents/Items';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProvider from "../firebase/auth-provider";

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Items />, div);
});

it('pushes buttons!', () => {
    const wrapper = mount(
        <UserProvider value={{ business: "test" }}>
            <Items />
        </UserProvider>
    );

    console.log(wrapper.debug());

    const button = wrapper.find("button");
    button.simulate('click');
});