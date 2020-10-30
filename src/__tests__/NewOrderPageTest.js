import React from 'react';
import ReactDOM from 'react-dom';
import NewOrderPage from '../pages/NewOrderPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewOrderPage />, div);
});