import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './components/ProTip';
import Dashboard from './pages/Dashboard'
import SignInSide from './pages/SignIn';
import Landing from "./pages/Landing";
import Demo from './pages/Demo';
import Sales from './pages/Sales';
import NewOrderPage from './pages/NewOrderPage';
import UserProvider from "./firebase/auth-provider";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from './pages/UserProfile';
import Inventory from './pages/Inventory';
import CollectInfo from "./pages/CollectInfo";

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
          <PrivateRoute path="/userprofile" component={UserProfile} exact/>
          <PrivateRoute path="/inventory" component={Inventory} exact/>
          <PrivateRoute path="/new_order" component={NewOrderPage} exact />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/orders" component={Sales} exact />
          <PrivateRoute path="/collectinfo" component={CollectInfo} exact />
          <Route path="/signin" component={SignInSide} exact />
          <Route path="/" component={Landing} />
        </Switch>
      </UserProvider>
    </Router>
  );
}
