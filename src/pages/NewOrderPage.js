import * as React from 'react';
import { firestore } from '../firebase/firebase.utils'
import NewOrder from '../components/NewOrder';

class NewOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
      current_step: 0,
    };
  }

  componentDidMount() {
    const db = firestore.collection("inventory");

    this.unsubscribeFromSnapshot = db.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
          let {
            name,
            quantity,
            price,
          } = doc.data();

          const item =  {
            id: doc.id,
            name: name,
            quantity: quantity,
            price: price,
            image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg",
            add: () => {
              if (quantity === 0) {
                alert("No more such item currently available");
                return;
              }
              let selected = this.state.selected;
              let found = false;
              for (let i = 0; i < selected.length; i++) {
                if (selected[i].id === doc.id) {
                  selected[i].quantity ++;
                  selected[i].total += price;
                  found = true;
                  break;
                }
              }
              if (!found) {
                selected.push({
                  id: doc.id,
                  name: name,
                  quantity: 1,
                  total: price,
                  price: price,
                  image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg",
                });
              }
              quantity --;
              this.setState({
                selected: selected,
              })
              console.log(this.state.selected);
            },
            remove: () => {
              let selected = this.state.selected;
              for (let i = 0; i < selected.length; i++) {
                if (selected[i].id === doc.id) {
                  if (selected[i].quantity === 1) {
                    selected.splice(i, 1);
                  }
                  else {
                    selected[i].quantity --;
                    selected[i].total -= price;
                  }
                  break;
                }
              }
              quantity ++;
              this.setState({
                selected: selected,
              })
              console.log(this.state.selected);
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
