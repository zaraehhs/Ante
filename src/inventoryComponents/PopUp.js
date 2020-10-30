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

    handleClick = () => {
        this.props.toggle();
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        const { user, business } = this.context;

        // alert("You are submitting " + this.state.name + this.state.price + this.state.quantity);
        firestore.collection("inventory").add({
            business: business,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        }).then(function (docRef) {
        }).catch(function (error) {
            alert("Error!");
        });
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
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <form onSubmit={this.mySubmitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="menu" name="name" variant="outlined" required fullWidth id="menuItem" label="Menu Item" autoFocus onChange={this.menuItemHandler}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="pricing" name="price" variant="outlined" required fullWidth id="price" label="Price" autoFocus onChange={this.priceHandler} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="qnty" name="quantity" variant="outlined" required fullWidth id="quantity" label="Quantity" autoFocus onChange={this.quantityHandler} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary"> Add Item </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }
}