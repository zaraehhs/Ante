import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { auth, googleAuth } from "../firebase/firebase.utils";
import googleImage from '../images/google_sign_in.png';
import logo from '../images/login.svg';
import { useHistory } from 'react-router-dom';
import { firestore } from "../firebase/firebase.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignInSide = () => {
  const classes = useStyles();
  const history = useHistory();

  async function createUser(uid) {
    await firestore.collection("users").doc(uid).set({
      admin: true,
      last_login: new Date().getTime()
    }, { merge: true });
  }

  const googleSignIn = () => {
    auth.signInWithPopup(googleAuth).then(function (result) {
      createUser(result.user.uid);

      var docRef = firestore.collection("users").doc(result.user.uid);

      docRef.get().then(function (doc) {
        if (doc.exists) {
          if (doc.data().setup_complete) {
            if (doc.data().business) {
              history.push('/new_order');
            }
            else {
              history.push('/dashboard');
            }
          }
          else {
            history.push('/collectinfo');
          }
        }
      }).catch(function (error) {
        alert(error.message);
      });

    }).catch(function (error) {
      alert(error.message);
    });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            Sign In
          </Typography>
          <br />
          <br />
          <img src={googleImage}
            id="clickME"
            width="50%"
            onClick={googleSignIn} />
          <br />
          <img src={logo} style={{ position: "absolute", bottom: 0, marginBottom: "20px" }} width="30%" />
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;