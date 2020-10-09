import React from 'react';
import Button from '@material-ui/core/Button';
import { firestore } from "../firebase/firebase.utils";
import PopUp from "./PopUp"; 

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false, items: []};
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("inventory");

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const list = snapshot.docs.map(doc => {
                return {
                    bid: doc.data().business,
                    menu_item: doc.data().name,
                    pricing: doc.data().price,
                    qnty: doc.data().quantity,
                }
            });
            this.setState({items: list});
            // console.log(list);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    remove = (event) => {
        event.preventDefault();
        alert("remove!");

        var postsRef = firestore.collection('inventory');
        postsRef.where('name', '==', 'cookie').get().then(snapshot => {
            snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            firestore.collection('inventory').doc(doc.id).delete();
        });
        }).catch(err => {
            console.log('Error getting documents', err);
        });
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
            this.state.items.map(({ bid, menu_item, pricing, qnty }) => (
            <>
            <span> BID: {bid} </span>
            <span> Item: {menu_item} </span> 
            <span> Price: {pricing} </span> 
            <span> Quantity: {qnty} </span>
                &nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary" onClick={this.remove.bind(this)}>Delete</Button>
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