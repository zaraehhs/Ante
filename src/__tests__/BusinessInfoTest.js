import React from 'react';
import ReactDOM from 'react-dom';
import BusinessInfo from '../components/BusinessInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusinessInfo />, div);
});