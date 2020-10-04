import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCeZnbo5JhxDPc5ocowWtKzgVSSeXDGO5A",
    authDomain: "comp523-ante.firebaseapp.com",
    databaseURL: "https://comp523-ante.firebaseio.com",
    projectId: "comp523-ante",
    storageBucket: "comp523-ante.appspot.com",
    messagingSenderId: "491266331719",
    appId: "1:491266331719:web:bc04af301df3d933058d62"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;