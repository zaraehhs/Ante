import * as React from 'react';
import { firestore } from '../firebase/firebase.utils'
import NewOrder from '../components/NewOrder';
import { UserContext } from "../firebase/auth-provider";

class NewOrderPage extends React.Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
      current_step: 0,
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      customer_address: "",
      customer_membership: "",
      customer_other: "",
      business: "",
      total: 0,
      next_step: () => {
        switch (this.state.current_step) {
          case 0:
            if (this.state.selected.length === 0) {
              alert("Add item(s) into cart to proceed");
              return false;
            }
            this.setState({ current_step: 1 });
            return true;
          case 1:
            this.setState({ current_step: 2 });
            return true;
          case 2:
            firestore.collection("sales").add({
              name: this.state.customer_name,
              email: this.state.customer_email,
              phone: this.state.customer_phone,
              address: this.state.customer_address,
              membership: this.state.customer_membership,
              other: this.state.customer_other,
              items: this.state.selected,
              business: this.state.business,
              total: this.state.total,
              timestamp: new Date().getTime(),
            }).then(function (docRef) {
              alert("Order Placed")
            }).catch(function (error) {
              alert("An error has occured");
            });
            return true;
          default:
            return false;
        }
      },
      prev_step: () => {
        switch (this.state.current_step) {
          case 0:
            return false;
          case 1:
            this.setState({ current_step: 0 });
            return true;
          case 2:
            this.setState({ current_step: 1 });
            return true;
          default:
            return false;
        }
      }
    };
  }

  componentDidMount() {
    const { user, business } = this.context;
    this.setState({ business: business });
    const db = firestore.collection("inventory").where("business", "==", business);

    this.unsubscribeFromSnapshot = db.onSnapshot(async snapshot => {
      const list = snapshot.docs.map(doc => {
        let {
          name,
          quantity,
          price,
        } = doc.data();
        price = parseFloat(price);
        const item = { id: doc.id, name: name, quantity: quantity, price: price,
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
                selected[i].quantity++;
                selected[i].total += price;
                found = true;
                break;
              }
            }
            if (!found) {
              selected.push({
                id: doc.id, name: name, quantity: 1, total: price, price: price,
                image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg",
              });
            }
            quantity--;
            this.setState({
              selected: selected,
            })
          },
          remove: () => {
            let selected = this.state.selected;
            for (let i = 0; i < selected.length; i++) {
              if (selected[i].id === doc.id) {
                if (selected[i].quantity === 1) {
                  selected.splice(i, 1);
                }
                else {
                  selected[i].quantity--;
                  selected[i].total -= price;
                }
                break;
              }
            }
            quantity++;
            this.setState({
              selected: selected,
            })
          },
        }

        return item;
      });
      this.setState(
        {
          business: business,
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
