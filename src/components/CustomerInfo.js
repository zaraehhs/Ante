import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function CustomerInfo(props) {
  const classes = useStyles();

  const handleNameChange = (e) => {
    props.props.customer_name = e.target.value;
  }

  const handleEmailChange = (e) => {
    props.props.customer_email = e.target.value;
  }

  const handlePhoneChange = (e) => {
    props.props.customer_phone = e.target.value;
  }

  const handleAddressChange = (e) => {
    props.props.customer_address = e.target.value;
  }

  const handleMembershipChange = (e) => {
    props.props.customer_membership = e.target.value;
  }

  const handleOtherChange = (e) => {
    props.props.customer_other = e.target.value;
  }

  return (
    <div className={classes.root}>
      <br />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <TextField
          id="standard-full-width"
          label="Name"
          defaultValue={props.props.customer_name}
          style={{ margin: 8 }}
          placeholder="Joe Biden"
          fullWidth
          margin="normal"
          onChange={handleNameChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Email"
          defaultValue={props.props.customer_email}
          style={{ margin: 8 }}
          placeholder="abc@company.com"
          fullWidth
          margin="normal"
          onChange={handleEmailChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Phone"
          defaultValue={props.props.customer_phone}
          style={{ margin: 8 }}
          placeholder="(123)456-7890"
          fullWidth
          margin="normal"
          onChange={handlePhoneChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Address"
          defaultValue={props.props.customer_address}
          style={{ margin: 8 }}
          placeholder="1600 Pennsylvania Avenue NW, Washington, DC 20500"
          fullWidth
          margin="normal"
          onChange={handleAddressChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Membership"
          defaultValue={props.props.customer_membership}
          style={{ margin: 8 }}
          placeholder="1111-2222-3333-4444"
          fullWidth
          margin="normal"
          onChange={handleMembershipChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Other"
          defaultValue={props.props.customer_other}
          style={{ margin: 8 }}
          placeholder="Any other info"
          fullWidth
          margin="normal"
          onChange={handleOtherChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </div>
  );
}
