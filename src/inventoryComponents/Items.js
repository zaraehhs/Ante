import React from 'react';
import Button from '@material-ui/core/Button';
import { firestore } from "../firebase/firebase.utils";
import PopUp from "./PopUp";
import { UserContext } from "../firebase/auth-provider";

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showForm: false, items: [], editItem: null };
    }
    static contextType = UserContext;

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { business } = this.context;

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
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    remove = (id) => {
        firestore.collection('inventory').doc(id).delete();
    }

    edit = (id, menu_item, pricing, qnty) => {
        this.setState({
            showForm: !this.state.showForm,
            editItem: {
                id: id,
                menu_item: menu_item,
                pricing: pricing,
                qnty: qnty
            }
        });
    }

    togglePop = () => {
        this.setState({
            showForm: !this.state.showForm,
            editItem: null
        });
    };
    //
    render() {
        return <>
            <div className="btn" onClick={this.togglePop}>
                <Button id="testME" variant="contained" color="primary">Add Menu Item</Button>
            </div>
            {this.state.showForm ? <PopUp editItem={this.state.editItem} toggle={this.togglePop} /> : null}
            {
                this.state.items.map(({ menu_item, pricing, qnty, id }) => (
                    <>
                        <span> Item: {menu_item} </span>
                        <span> Price: {pricing} </span>
                        <span> Quantity: {qnty} </span>
                        <Button variant="contained" color="secondary" onClick={() => this.remove(id)}>Delete</Button>
                &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="secondary" onClick={() => this.edit(id, menu_item, pricing, qnty)}>Edit</Button>
                &nbsp;&nbsp;&nbsp;
                    </>
                ))
            }
        </>
    }
}

export default Items;