import React from 'react';
import Dashboard from './pages/Dashboard'
import SignInSide from './pages/SignIn';
import Sales from './pages/Sales';
import NewOrderPage from './pages/NewOrderPage';
import UserProvider from "./firebase/auth-provider";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from './pages/UserProfile';
import Inventory from './pages/Inventory';
import CollectInfo from "./pages/CollectInfo";
import Landing from "./Landing/Landing";

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
          <PrivateRoute path="/userprofile" component={UserProfile} exact />
          <PrivateRoute path="/inventory" component={Inventory} exact />
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
