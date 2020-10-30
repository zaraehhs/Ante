import React from 'react';
import ReactDOM from 'react-dom';
import CustomerInfo from '../components/CustomerInfo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CustomerInfo props={{ customer_name: "Joe Biden" }} />, div);
});