import React, {useEffect, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { firestore } from "../firebase/firebase.utils";


/* class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sales: []};

    console.log(this.state)
  } */

// Generate Sales Data
/* function createData(time, amount) {
  return { time, amount };
} 

//Number of sales per month. 

const data = [
  createData('Jan', 0),
  createData('Feb', 300),
  createData('Mar', 600),
  createData('Apr', 800),
  createData('May', 1500),
  createData('Jun', 2000),
  createData('Jul', 2400),
  createData('Aug', 2400),
  createData('Sept', 2000),
  createData('Oct', 2400),
  createData('Nov', 2400),
  createData('Dec', undefined),
]; */

export default function Chart() {
  const theme = useTheme();
  const [salesList, setSalesList] = useState([]); 

  useEffect(() => {
    const salesDB = firestore.collection("zaratestdata"); //should be pulling from sales instead 

      //Count number of sales per month. 1 entry = 1 sale 
      //get month from timestamp
    const unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      console.log("check");
      const monthCounts = {}; 
      snapshot.docs.forEach(( doc) => {
        console.log("check1");

        const {timestamp} = doc.data();
        const date = new Date(timestamp['seconds']*1000 + timestamp['nanoseconds']);
        const month = date.toLocaleString('default', {month: 'long'});
        if (monthCounts[month]) {
            monthCounts[month] = monthCounts[month] + 1
        } else {
          monthCounts[month] = 1
        }

        
      },);

      console.log(monthCounts); 
      // {"Octoboe": 4, "September": 5, "Janurary": 7}
      // [{time: "October", amount:4}, {time: "September", amount: 5}]
      const sales = Object.keys(monthCounts).map((key) => {
        return {time: key, amount: monthCounts[key]}
      });
      setSalesList(sales);
    });
    return () => {
      unsubscribeFromSnapshot(); //unmounts
    }
  },[]); //anytime [] changes


  return (
    <React.Fragment>
      <Title> Average Monthly Sales</Title>
      <ResponsiveContainer>
        <LineChart
           data={salesList}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
