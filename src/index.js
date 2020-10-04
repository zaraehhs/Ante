
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyCeZnbo5JhxDPc5ocowWtKzgVSSeXDGO5A",
  authDomain: "comp523-ante.firebaseapp.com",
  databaseURL: "https://comp523-ante.firebaseio.com",
  projectId: "comp523-ante",
  storageBucket: "comp523-ante.appspot.com",
  messagingSenderId: "491266331719",
  appId: "1:491266331719:web:bc04af301df3d933058d62"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);