import './App.css';
import Forecast from './components/Forecast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
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

  handleClick = (e) => {
    e.preventDefault();
    this.setState({city: e.target.value})
  }

  render(){
    return (
      <div className="App">
        <h2 style={{fontFamily: "Helvetica", fontSize: "6em"}}>5 Day Forecast</h2>
        <div class="btn-group-lg btn-group-horizontal">
          <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="New York">New York</Button> 
          <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="London">London</Button>  
          <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="Tokyo">Tokyo</Button>
        </div>
        <Forecast city={this.state.city} /> 
      </div>
    );
  }
}
export default App;
