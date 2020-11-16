import React, { useEffect, useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { firestore } from "../firebase/firebase.utils";
import { UserContext } from "../firebase/auth-provider";

export default function Chart() {
  const theme = useTheme();
  const [salesList, setSalesList] = useState([]);

  const business = useContext(UserContext).business;

  useEffect(() => {
    const salesDB = firestore.collection("sales").where("business", "==", business);

    //Count number of sales per month. 1 entry = 1 sale
    //get month from timestamp
    const unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      const monthCounts = {
        "January": 0,
        "February": 0,
        "March": 0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0,
      };
      snapshot.docs.forEach((doc) => {
        const { timestamp, total } = doc.data();
        const date = new Date(timestamp);
        if (date.getFullYear() === new Date().getFullYear()) {
          const month = date.toLocaleString('default', { month: 'long' });
          if (monthCounts[month]) {
            monthCounts[month] = monthCounts[month] + total
          } else {
            monthCounts[month] = total
          }
        }
      });
      const sales = Object.keys(monthCounts).map((key) => {
        return { time: key, amount: monthCounts[key] }
      });
      setSalesList(sales);
    });
    return () => {
      unsubscribeFromSnapshot(); //unmounts
    }
  }, []); //anytime [] changes

  return (
    <React.Fragment>
      <Title> Monthly Sales</Title>
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
