import React from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from '../components/PrivateRoute';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProvider from "../firebase/auth-provider";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

configure({ adapter: new Adapter() });

it('testing!!!', () => {
    var wrapper = mount(
        <Router>
            <Switch>
                <UserProvider value={{ user: null }}>
                    <PrivateRoute path="/testing" component={<></>} exact />
                </UserProvider>
            </Switch>
        </Router>
    );
    wrapper = mount(
        <Router>
            <Switch>
                <UserProvider value={{ user: "test" }}>
                    <PrivateRoute path="/testing" component={<></>} exact />
                </UserProvider>
            </Switch>
        </Router>
    );
});