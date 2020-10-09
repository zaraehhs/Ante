import React, { Component, createContext } from "react";
import { auth } from "./firebase.utils";
import { firestore } from '../firebase/firebase.utils'

export const UserContext = createContext({ "user": null, "business": null, name: null, email: null });
class UserProvider extends Component {
    state = {
        user: JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')).uid : null,
        name: JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')).name : null,
        email: JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')).email : null,
        business: JSON.parse(window.localStorage.getItem('business')) ? JSON.parse(window.localStorage.getItem('business')).business : null
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                const user = { uid: userAuth.uid, name: userAuth.displayName, email: userAuth.email };

                window.localStorage.setItem('user', JSON.stringify(user));
                this.setState({ user: user.uid, email: user.email, name: user.name });

                var docRef = firestore.collection("users").doc(userAuth.uid);
                var that = this;

                docRef.get().then(function (doc) {
                    if (doc.exists) {
                        const { admin } = doc.data();
                        if (admin) {
                            that.setState({ business: userAuth.uid });
                            const business_object = { business: userAuth.uid }
                            window.localStorage.setItem('business', JSON.stringify(business_object));
                        }
                        else {
                            const { business } = doc.data();
                            that.setState({ business: business });
                            const business_object = { business: business }
                            window.localStorage.setItem('business', JSON.stringify(business_object));
                        }
                    }
                });
            }
            else {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('business');
                this.setState({ user: null });
            }
        });

    };
    render() {
        return (
            <UserContext.Provider value={{ user: this.state.user, business: this.state.business, name: this.state.name, email: this.state.email }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;