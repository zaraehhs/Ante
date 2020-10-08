import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './components/ProTip';
import Dashboard from './pages/Dashboard'
import SignInSide from './pages/SignIn';
import Demo from './pages/Demo';
import Sales from './pages/Sales';
import NewOrderPage from './pages/NewOrderPage';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new_order" component={NewOrderPage} />
        <Route path="/demo" component={Demo} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/orders" component={Sales} />
        <Route path="/" component={SignInSide} />
      </Switch>
    </Router>
  );
}
