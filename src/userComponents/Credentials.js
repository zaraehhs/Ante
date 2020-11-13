import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { UserContext } from "../firebase/auth-provider";

class Credentials extends React.Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);
  }

  render() {

    const { user, business } = this.context;

    return <>
      <React.Fragment>
        <Grid container>
          <Grid item md={6}>
            <div>
              <Paper elevation={0} >
                <Typography variant="h6" gutterBottom> Credentials </Typography>
                <Typography>{user === business ? "Business Owner" : "Employee"}</Typography>
                <Typography><b>UID:</b> {user}</Typography>
                <Typography><b>BID:</b> {business}</Typography>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    </>
  }
}

export default Credentials;