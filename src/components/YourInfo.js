import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getUser, auth } from "../firebase/firebase.utils";

class YourInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstname: "", lastname: "", email: "" };
    }

    getMyUser() {
        var that = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                that.setState({ firstname: user.displayName, email: user.email });
            }
        });
    }

    componentDidMount() {
        this.getMyUser();
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Your Info
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Name"
                            fullWidth
                            autoComplete="given-name"
                            value={this.state.firstname}
                            disabled="true"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            value={this.state.email}
                            fullWidth
                            autoComplete="shipping address-line1"
                            disabled="true"
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default YourInfo;