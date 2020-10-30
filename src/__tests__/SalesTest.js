import React from 'react';
import ReactDOM from 'react-dom';
import Sales from '../pages/Sales';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sales />, div);
});