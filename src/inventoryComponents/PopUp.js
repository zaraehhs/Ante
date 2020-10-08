import React, { Component } from "react";
import { firestore } from "../firebase/firebase.utils";
import { number } from "prop-types";

export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', price: number, quantity: number };
    }

    handleClick = () => {
        this.props.toggle();
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        // alert("You are submitting " + this.state.name + this.state.price + this.state.quantity);
        firestore.collection("inventory").add({
            business: "fP5KD8ZPEcNW98VNtrFyOzPGFoC2",
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        }).then(function (docRef) {
        }).catch(function (error) {
            alert("Error!");
        });
    }

    menuItemHandler = (event) => {
        this.setState({name: event.target.value});
    }

    priceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    quantityHandler = (event) => {
        this.setState({quantity: event.target.value});
    }

    render() {
        return (
        <div className="modal">
        <div className="modal_content">
        <span className="close" onClick={this.handleClick}>&times;    </span>
        <form onSubmit={this.mySubmitHandler}>
        <label>
            Menu Item:
            <input type="text" name="name" onChange={this.menuItemHandler}/>
        </label> <br></br>
        <label>
            Price:
            <input type="float" name="price" onChange={this.priceHandler}/>
        </label> <br></br>
        <label>
            Quantity:
            <input type="number" name="quantity" onChange={this.quantityHandler}/>
        </label> <br></br>
        <input type="submit" value="Add Item"></input>
        </form>
        </div>
        </div>
    );
    }
}