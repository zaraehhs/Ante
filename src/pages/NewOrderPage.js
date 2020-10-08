import * as React from 'react';
import { firestore } from '../firebase/firebase.utils'
import NewOrder from '../components/NewOrder';

class NewOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
    };
  }

  componentDidMount() {
    const db = firestore.collection("inventory");

    this.unsubscribeFromSnapshot = db.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
          let {
            name,
            quantity,
          } = doc.data();

          const item =  {
            id: doc.id,
            name: name,
            quantity: quantity,
            add: () => {
              if (quantity === 0) {
                alert("No more such item currently available");
                return;
              }
              this.state.selected.push({
                id: doc.id,
                name: name,
              });
              quantity --;
            },
            remove: () => {
              for (let i = 0; i < this.state.selected.length; i++) {
                if (this.state.selected[i].id === doc.id) {
                  this.state.selected.splice(i, 1);
                  quantity ++;
                  break;
                }
              }
            },
          }

          return item;
      });
      this.setState(
        {
          items: list,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <NewOrder props={this.state} />
    );
  }
}

export default NewOrderPage;
