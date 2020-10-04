import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { firestore } from "../firebase/firebase.utils";

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { textFieldValue: "", items: []};

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("testdata");

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const list = snapshot.docs.map(doc => {
                const { data } = doc.data();
                return {
                    text: data
                }
            });
            this.setState({"items": list});
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    submit() {
        firestore.collection("testdata").add({
            data: this.state.textFieldValue
        }).then(function (docRef) {
        }).catch(function (error) {
            alert("Error!");
        });
    }

    handleTextFieldChange(e) {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    render() {
        return <>
            <TextField id="standard-basic" label="Standard" onChange={this.handleTextFieldChange} />
            <Button variant="contained" color="primary" onClick={this.submit}>
                Send Data
            </Button>
            {
                this.state.items.map(({ text }) => (
                    <>
                    <br></br>
                    <span> {text} </span>
                    <br></br>
                    </>
                ))
            }
        </>
    }
}

export default Demo;