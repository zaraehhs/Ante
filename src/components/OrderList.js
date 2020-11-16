import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { firestore } from "../firebase/firebase.utils";
import { UserContext } from "../firebase/auth-provider";

class OrderList extends React.Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    const { user, business } = this.context;
    const salesDB = firestore.collection("sales").where("business", "==", business);

    this.unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
          const {
            items,
            name,
            total,
            timestamp
          } = doc.data();

          const summary = [];
          const date = new Date(timestamp);
          if (items) {
            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              summary.push(item.quantity + ' x ' + item.name);
            }
          }

          const order =  {
            id: doc.id,
            timestamp: timestamp,
            date: date.toLocaleString(),
            customer: name,
            summary: summary.join(', '),
            total: total.toFixed(2),
          }

          return order;
      });
      this.setState(
        {
          "rows": list,
      });
    });
  }

  componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

  columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'summary',
      headerName: 'Summary',
      width: 750,
    },
    { field: 'customer', headerName: 'Customer', width: 150 },
    {
      field: 'total',
      headerName: 'Total',
      width: 90,
    },
  ];

  // rows = [
  //   { id: 1, customer: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  render() {
    return (
      <div style={{ height: 750, width: '100%' }}>
        <DataGrid rows={this.state.rows} columns={this.columns} pageSize={5} checkboxSelection />
      </div>
    );
  }
}

export default OrderList;
