import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { firestore } from "../firebase/firebase.utils";
import { number } from 'prop-types';
import Footer from "../userComponents/Footer";
import Header from '../userComponents/Header';
import MainFeaturedPost from '../userComponents/MainFeaturedPost';
import Sidebar from '../userComponents/Sidebar';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const sections = [
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  // image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  // linkText: 'Continue reading…',
};

const sidebar = {
  title: 'Credentials',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

class UserProfile extends React.Component {
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
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title= {this.state.userStatus} sections={sections} />
        <main>

        {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
        <Grid container>
        <Grid item md={6}>
          <div>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {this.state.firstName} {this.state.lastName}
            </Typography>
            {/* <Typography variant="h5" color="inherit" paragraph>
              {this.state.userStatus}
            </Typography> */}
          </div>
        </Grid>
      </Grid>
        <Paper elevation={0} >
        <Typography variant="h6" gutterBottom>
          Credentials
        </Typography>
        <Typography>UID: {this.state.uid}</Typography>
        <Typography>BID: {this.state.bid}</Typography>
      </Paper>
            {<div>
                {/* <h2>Created {this.state.created.toLocaleTimeString()}.</h2> */}
                {/* <h2>Status {this.state.userStatus}.</h2>
                <h2>First Name {this.state.firstName}.</h2>
                <h2>Last Name {this.state.lastName}.</h2> */}
                <h2>Email {this.state.email}.</h2>
                {/* <h2>UID {this.state.uid}.</h2>
                <h2>Business ID {this.state.bid}.</h2> */}
              </div>
            }
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
            </main>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!" />
            </React.Fragment>
        </>
    }
}

export default UserProfile;