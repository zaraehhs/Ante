import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../pages/SignIn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignIn />, div);
});