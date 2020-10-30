import React from 'react';
import ReactDOM from 'react-dom';
import Cart from '../components/Cart';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cart props={{ items: [{ id: "1", name: "test", image: "test1", price: "test23" }] }} />, div);
});