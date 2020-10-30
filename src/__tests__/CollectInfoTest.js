import React from 'react';
import ReactDOM from 'react-dom';
import CollectInfo from '../pages/CollectInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CollectInfo />, div);
});