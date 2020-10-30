import React from 'react';
import ReactDOM from 'react-dom';
import InventoryInfo from '../components/InventoryInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InventoryInfo />, div);
});