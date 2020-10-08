import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthDataContext } from "../firebase/auth-provider";
import { UserContext } from "../firebase/auth-provider";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useContext(UserContext);
    
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;