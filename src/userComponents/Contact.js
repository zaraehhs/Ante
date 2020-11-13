import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { UserContext } from "../firebase/auth-provider";

class Contact extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    render() {
        const { email } = this.context;

        return <>
        <React.Fragment>
            <Grid container>
                <Grid item md={6}>
                <div>
                <Paper elevation={0} >
                    <Typography> {email} </Typography>
                </Paper>
                </div>
                </Grid>
            </Grid>
        </React.Fragment>
        </>
    }
}

export default Contact;