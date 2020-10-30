import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { firestore, auth } from "../firebase/firebase.utils";

class InventoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", price: "", quantity: "", items: [] };

        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.submit = this.submit.bind(this);
    }


    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handlePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    handleQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        var that = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                const collectionRef = firestore.collection("inventory").where("business", "==", user.uid);

                that.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
                    const list = snapshot.docs.map(doc => {
                        return doc.data();
                    });
                    that.setState({ "items": list });
                });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    submit() {
        var that = this;
        auth.onAuthStateChanged(function (user) {
            if (user) {
                firestore.collection("inventory").add({
                    name: that.state.name,
                    price: parseFloat(that.state.price),
                    quantity: parseInt(that.state.quantity),
                    business: user.uid
                }).then(function (docRef) {
                }).catch(function (error) {
                    alert("Error!");
                });
                that.setState({ name: "", price: "", quantity: "" });
            }
        });

    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Add Inventory
      </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id="itemName" label="Item Name" fullWidth value={this.state.name} onChange={this.handleName} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="itemPrice" label="Price" fullWidth value={this.state.price} onChange={this.handlePrice} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="itemQuantity" label="Quantity" fullWidth value={this.state.quantity} onChange={this.handleQuantity} />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Button id="CLICKPLS" variant="contained" onClick={this.submit}>
                            Add
            </Button>
                    </Grid>
                    <Grid item xs={12}>
                        Items:
            {
                            this.state.items.map(({ name, price, quantity }) => (
                                <>
                                    <p>{quantity} x {name} @ ${price}</p>
                                </>
                            ))
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default InventoryInfo;