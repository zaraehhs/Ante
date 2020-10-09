import React from 'react';
import Button from '@material-ui/core/Button';
import { firestore } from "../firebase/firebase.utils";
import PopUp from "./PopUp";
import { UserContext } from "../firebase/auth-provider";

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showForm: false, items: [] };
    }
    static contextType = UserContext;

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { user, business } = this.context;

        const collectionRef = firestore.collection("inventory").where("business", "==", business);

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const list = snapshot.docs.map(doc => {

                return {
                    id: doc.id,
                    menu_item: doc.data().name,
                    pricing: doc.data().price,
                    qnty: doc.data().quantity,
                }
            });
            this.setState({ items: list });
            // console.log(list);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    remove = (id) => {
        firestore.collection('inventory').doc(id).delete();
    }

    edit = () => {
        alert("edit!");
    }

    togglePop = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    };

    render() {
        return <>
            <div className="btn" onClick={this.togglePop}>
                <Button variant="contained" color="primary">Add Menu Item</Button>
            </div>
            {this.state.showForm ? <PopUp toggle={this.togglePop} /> : null} &nbsp;&nbsp;&nbsp;
            {
                this.state.items.map(({ bid, menu_item, pricing, qnty, id }) => (
                    <>
                        <span> Item: {menu_item} </span>
                        <span> Price: {pricing} </span>
                        <span> Quantity: {qnty} </span>
                &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={() => this.remove(id)}>Delete</Button>
                &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={this.edit}>Edit</Button>
                &nbsp;&nbsp;&nbsp;
                    </>
                ))
            }
        </>
    }
}

export default Items;