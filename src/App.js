import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      temp:'Please Enter Your Zip Code',
      high:'High',
      low:'Low'
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

    if(isNaN(newZip) === true){//if the string input by the user was not a number, we'll change the state to prompt them to put in a number
      this.setState({
        temp:'Please Enter a Valid Zip Code.'
      })
    }else{
      axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&APPID=d6f07a1cb2a62e6afc1ac709f42831e7`)
      .then((response) => {
        console.log(response.data);

        let data = response.data;

        let weather = data.main.temp;
        let min = data.main.temp_min;
        let max = data.main.temp_max;

        console.log(data.main.temp);

        this.setState({
          temp:Math.floor(9/5 * (weather - 273) + 32) + " °F ",
          high:"hi " + Math.floor(9/5 * (max - 273) + 32) + " °F ",
          low:"lo " + Math.floor(9/5 * (min - 273) + 32) + " °F "
        });
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
      <div className="reactContainer">
        <div className="formContainer">
          <form onSubmit={(e)=>{this.showTemp(e)}}>
          <div className="inputContainer">
            <input type="text" placeholder="Enter Zip Here" className="zipfield"/>
            <input type="button" value="search" className="button" onClick={(e)=>{this.showTemp(e)}}/>
          </div>
          <div className="temp">
            <h1>{this.state.temp}</h1>
          </div>
          <div className="high">
            <h1>{this.state.high}</h1>
          </div>
          <div className="low">
            <h1>{this.state.low}</h1>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
