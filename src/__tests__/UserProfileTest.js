import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from '../pages/UserProfile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProfile />, div);
});