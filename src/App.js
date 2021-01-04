import './App.css';
import Forecast from './components/Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class App extends Component {
  // const [city, setCity] = useState("")
  // function handleClick(e){
  //   e.preventDefault();
  //   // console.log("Button Clicked")
  //   console.log(e.target.value)
  //   // setCity(e.target.value)
    
  // }
  constructor(){
    super();
    this.state = {
      city: "New York"
    }
  }



  render(){
    return (
      <div className="App">
        <h2 style={{fontFamily: "Helvetica", fontSize: "6em"}}>5 Day Forecast</h2>
        
        <Forecast /> 
      </div>
    );
  }
}
export default App;
