import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      temp:'Please Enter Your Zip Code',
    }
  }

  componentDidMount(){
  }

  // fetchAPI(){
  //   axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${userZip},us&APPID=d6f07a1cb2a62e6afc1ac709f42831e7`)
  //   .then(function(response){
  //     console.log(response.data);
  //   })
  //   .catch((error)=>{
  //     console.error(error);
  //   })
  // }

  showTemp(e){
    e.preventDefault();

    let userZip = $(".zipfield").val();

    if(userZip.length === 5){
      let newZip = parseInt(userZip);//changing the type of userZip from a basic string to a number

    if(isNaN(newZip) === true){//if the string input by the user was not a number, we'll change the state to make them put in a number
      this.setState({
        temp:'Please Enter a Valid Zip Code.'
      })
    }else{
      axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&APPID=d6f07a1cb2a62e6afc1ac709f42831e7`)
      .then(function(response){
        console.log(response.data);
    })
      .catch((error)=>{
        console.error(error);
    })
    }
  }else{
    this.setState({
      temp:'Please Enter a Valid Zip Code.'
    })
  } 
  }


  render(){
    return (
      <div>
        <form onSubmit={(e)=>{this.showTemp(e)}}>
          <input type="text" placeholder="Enter Zip Here" className="zipfield"/>
          <h1>{this.state.temp}</h1>
          <input type="button" value="search" onClick={(e)=>{this.showTemp(e)}}/>
        </form>
      </div>
    );
  }
}

export default App;
