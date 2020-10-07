import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { firestore } from "../firebase/firebase.utils";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {orders: []};
  }

  componentDidMount() {
    const salesDB = firestore.collection("sales");
    const itemsDB = firestore.collection("inventory");

    this.unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
          const { 
            items, 
            name, 
            price, 
            quantities,
            timestamp 
          } = doc.data();
          
          return {
              name: name,
              timestamp: timestamp,
              price: price
          }
      });
      this.setState(
        {
          "orders": list,
      });
    });
  }

  componentWillUnmount() {
      this.unsubscribeFromSnapshot();
  }

  createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }

  rows = [
    this.createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    this.createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    this.createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    this.createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    this.createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
  ];

  preventDefault(event) {
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Snapshot</TableCell>
              <TableCell>Sale Amount</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.orders.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell align="right">View Details</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <br/>
          <Link color="primary" href="/orders">
            See more orders
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Orders;
