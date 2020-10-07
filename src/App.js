import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './components/ProTip';
import Dashboard from './pages/Dashboard'
import SignInSide from './pages/SignIn';
import Demo from './pages/Demo';
import Landing from "./pages/Landing";
import CollectInfo from "./pages/CollectInfo";
import PrivateRoute from "./components/PrivateRoute";
import UserProvider from "./firebase/auth-provider";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route path="/demo" component={Demo} exact />
          <Route path="/signin" component={SignInSide} exact />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/collectinfo" component={CollectInfo} exact />
          <Route path="/" component={Landing} />
        </Switch>
      </UserProvider>
    </Router>
  );
}