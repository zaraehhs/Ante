import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { firestore } from "../firebase/firebase.utils";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.go = this.go.bind(this);
    }

    go() {
        this.props.history.push('/dashboard');
    }

    render() {
        return <>
            <h1>Landing Page Here!</h1>
            <Button variant="contained" color="primary" onClick={this.go}>
                Get Started
            </Button>
        </>
    }
}

export default Landing;