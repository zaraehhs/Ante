import React from 'react';
import { firestore } from "../firebase/firebase.utils";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", isActive: false };
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("testdata");

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
          snapshot.forEach((doc) => {
            if (doc.data().active) {
              this.setState({firstName: doc.data().first_name});
              this.setState({lastName: doc.data().last_name});
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
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {this.state.firstName} {this.state.lastName}
                    </Typography>
                </div>
                </Grid>
            </Grid>
        </React.Fragment>
        </>
    }
}

export default Name;