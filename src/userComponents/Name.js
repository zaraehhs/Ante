import React from 'react';
import { firestore } from "../firebase/firebase.utils";
import { number } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userStatus: false, firstName: "", lastName: "", 
                       email: "", uid: number, isActive: false, bid: ""};
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("testdata");

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
          snapshot.forEach((doc) => {
            // if (doc.data().admin) {
            //   this.setState({bid: doc.id});
            // }

            if (doc.data().active) {
              // console.log("active!");
              // console.log(`${doc.id} => ${doc.data().first_name}`);
              // console.log(`${doc.id} => ${doc.data().last_name}`);
              // console.log(`${doc.id} => ${doc.data().email_id}`);
              // console.log(`${doc.id} => ${doc.data().admin}`);

              this.setState({firstName: doc.data().first_name});
              this.setState({lastName: doc.data().last_name});
              this.setState({email: doc.data().email_id});
              this.setState({bid: doc.data().business_id});
              this.setState({uid: doc.id});
              if (doc.data().admin) {
                this.setState({userStatus: "Admin"});
                // this.setState({bid: doc.id});
              } else {
                this.setState({userStatus: "Employee"});
              }

              // if (!doc.data().admin) {
              //   console.log("business ID = admin ID");
              // }
              // console.log(`${doc.id} => ${doc.data().created}`);
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
            {/* <Typography color="inherit" paragraph>
              {this.state.userStatus}
            </Typography> */}
          </div>
        </Grid>
      </Grid>
            </React.Fragment>
        </>
    }
}

export default Name;