import React, { Component, createContext } from "react";
import { auth } from "./firebase.utils";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
        user: JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')).uid : null
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                const user = { uid: userAuth.uid }
                window.localStorage.setItem('user', JSON.stringify(user));
                this.setState({ user: user.uid });
            }
            else {
                window.localStorage.removeItem('user');
                this.setState({ user: null });
            }
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;