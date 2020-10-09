import React from 'react';
import { firestore } from "../firebase/firebase.utils";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", isActive: false };
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("testdata");

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
          snapshot.forEach((doc) => {
            if (doc.data().active) {
              this.setState({email: doc.data().email_id});
            }
         });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    } 

    render() {
        return <>
        <React.Fragment>
            <Grid container>
                <Grid item md={6}>
                <div>
                <Paper elevation={0} >
                    <Typography> {this.state.email} </Typography>
                </Paper>
                </div>
                </Grid>
            </Grid>
        </React.Fragment>
        </>
    }
}

export default Contact;