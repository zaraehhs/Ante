import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { firestore, auth } from "../firebase/firebase.utils";

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textFieldValue: "", employees: [] };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  handleTextFieldChange(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    var that = this;
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const collectionRef = firestore.collection("employees").where("business", "==", user.uid);

        that.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
          const list = snapshot.docs.map(doc => {
            const { email } = doc.data();
            return {
              text: email
            }
          });
          that.setState({ "employees": list });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  submit() {
    var that = this;
    auth.onAuthStateChanged(function (user) {
      if (user) {
        firestore.collection("employees").add({
          email: that.state.textFieldValue,
          business: user.uid
        }).then(function (docRef) {
        }).catch(function (error) {
          alert("Error!");
        });
        that.setState({ textFieldValue: "" });
      }
    });

  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Add Employees
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <TextField required id="cardName" label="Employee gmail" fullWidth value={this.state.textFieldValue} onChange={this.handleTextFieldChange} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" onClick={this.submit}>
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            Employees:
            {
              this.state.employees.map(({ text }) => (
                <>
                  <p> {text} </p>
                </>
              ))
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default BusinessInfo;