import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { firestore } from "../firebase/firebase.utils";
import { UserContext } from "../firebase/auth-provider";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [total, settotal] = useState([]);
  const [days, setdate] = useState([]);
  const business = useContext(UserContext).business;

  useEffect(() => {
    const salesDB = firestore.collection("sales").where("business", "==", business);

    const unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      const totals = []; 

      let today = new Date();  // get the date
      let day = ("0" + today.getDate()).slice(-2);  //get day with slice to have double digit day
      let month = ("0" + (today.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
      let todaysdate = month + '/' + day + '/' + today.getFullYear();    

      snapshot.docs.forEach((doc) => {
        const { timestamp, total} = doc.data();

        let today1 = new Date(timestamp);  // get the date
        let day1 = ("0" + today1.getDate()).slice(-2);  //get day with slice to have double digit day
        let month1 = ("0" + (today1.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
        let purchaseDate = month1 + '/' + day1 + '/' + today1.getFullYear();    

        if (todaysdate == purchaseDate) {
          totals.push(total); 
        }        
      },);

      const sum = totals.reduce(function(a, b){
        return a + b;
    }, 0);
  
      settotal(sum);
      setdate(todaysdate); 
  
    });
    return () => {
      unsubscribeFromSnapshot(); //unmounts
    }
  },[]); //anytime [] changes

  return (
    <React.Fragment>
      <Title>Today's Sales</Title>
      <Typography component="p" variant="h4"> $
        {parseFloat(total).toFixed(2)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {days}
      </Typography>
      <div>  
      </div>
    </React.Fragment>
  );
}