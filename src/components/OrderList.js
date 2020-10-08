import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { firestore } from "../firebase/firebase.utils";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    const salesDB = firestore.collection("sales");

    this.unsubscribeFromSnapshot = salesDB.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
          const {
            items,
            name,
            total,
            timestamp
          } = doc.data();

          const summary = [];
          const date = new Date(timestamp['seconds']*1000 + timestamp['nanoseconds']);
          if (items) {
            for (let i = 0; i < items.length; i++) {
              let item = items[i];
              summary.push(item.item_quantity + ' x ' + item.item_name);
            }  
          }

          const order =  {
            id: doc.id,
            timestamp: timestamp['seconds']*1000 + timestamp['nanoseconds'],
            date: date.toLocaleString(),
            customer: name,
            summary: summary.join(', '),
            total: total,
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
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'timestamp', headerName: 'Timestamp', width: 150 },
    { field: 'date', headerName: 'Date', width: 190 },
    { field: 'customer', headerName: 'Customer', width: 150 },
    {
      field: 'summary',
      headerName: 'Summary',
      width: 300,
    },
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
