import React, { Component } from "react";
import { firestore } from "../firebase/firebase.utils";
import { number } from "prop-types";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { UserContext } from "../firebase/auth-provider";

export default class PopUp extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { name: '', price: number, quantity: number };
    }


    componentDidMount() {
        if (this.props.editItem) {
            this.setState({
                name: this.props.editItem.menu_item,
                price: this.props.editItem.pricing,
                quantity: this.props.editItem.qnty,
            });
        }
    }

    mySubmitHandler = (event) => {
        event.preventDefault();

        const { business } = this.context;

        var that = this;


        if (this.props.editItem == null) {
            firestore.collection("inventory").add({
                business: business,
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity
            }).then(function () {
                that.props.toggle();
            });
        }

        else {
            firestore.collection("inventory").doc(this.props.editItem.id).update({
                business: business,
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity
            }).then(function () {
                that.props.toggle();
            });
        }
    }

    menuItemHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    priceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    quantityHandler = (event) => {
        this.setState({ quantity: event.target.value });
    }

    render() {
        return (
            <>
                <span className="close" onClick={this.props.toggle} >&times;</span>
                <form onSubmit={this.mySubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="menu" name="name" variant="outlined" required fullWidth id="menuItem" label="Menu Item" autoFocus onChange={this.menuItemHandler} value={this.state.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField type="number" autoComplete="pricing" name="price" variant="outlined" required fullWidth id="price" label="Price" autoFocus onChange={this.priceHandler} value={this.state.price} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="number" autoComplete="qnty" name="quantity" variant="outlined" required fullWidth id="quantity" label="Quantity" autoFocus onChange={this.quantityHandler} value={this.state.quantity} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary"> {this.props.editItem ? "Edit" : "Add"} Item </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}