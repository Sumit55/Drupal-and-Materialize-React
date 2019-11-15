import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import classes from './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        pincode: '',
        msg: '',
        errors: {
          pincode: '',
        },
    }
  }

  pincodeCheckHandler = () => {
    var errors = this.state.errors;
    errors.pincode = '';  
    let pin = [];
      axios.get('/jsonapi/taxonomy_term/pincode')
      .then(res => {
        {res.data.data.map((value) => {
          pin.push(value.attributes.name);
      
        })}
        this.setState({msg: 'Deliver within 3 days'});
        if (pin.includes(this.state.pincode) === false) {
           
          errors.pincode = 'Not deliver in this area';
          this.setState({errors: errors});
        }
    
      })
    
  };

  changeHandler = event => {
    this.setState({
      pincode: event.target.value
    });
  }

  render() {   

    return (
        <div className={classes.App}>
          <LocationOnIcon /> <TextField
            error={this.state.errors["pincode"]}
            helperText={this.state.errors["pincode"] ? this.state.errors["pincode"] : this.state.msg}  
            label="Enter Delivery Pincode" value={this.state.pincode}  onChange={this.changeHandler} />
            
            <Button variant="contained" color="primary" className={classes.Button} onClick={this.pincodeCheckHandler}>Check
            </Button>
        </div>
    );
  };
};

export default App;
