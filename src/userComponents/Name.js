import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { UserContext } from "../firebase/auth-provider";

class Name extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.context;

        return <>
            <React.Fragment>
                <Grid container>
                    <Grid item md={6}>
                        <div>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {name}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    }
}

export default Name;