import React, { Component } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default class Forecast extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            city: "New York",
            coords: {
                "New York": { lat: 40.7143, lon: -74.006 },
                "London": { lat: 51.5085, lon: -0.1257 },
                "Tokyo": { lat: 35.6895, lon: 139.6917 }
            }
        }
    }
    async componentDidMount(){
        //    this.setState({city: this.props.city})
           console.log("IN FORECAST: " + this.state.city)
           await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords[this.state.city].lat}&lon=${this.state.coords[this.state.city].lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        data: result.daily.slice(0, 5)
                    }, console.log(result))
                })
        }
    
    handleClick = (e) => {
        e.preventDefault();
        // this.setState({city: e.target.value})
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords[e.target.value].lat}&lon=${this.state.coords[e.target.value].lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        data: result.daily.slice(0, 5), city: e.target.value
                    }, console.log(result))
                })
        console.log("IN HANDLE CLICK FUNCTION")
    }
    
    render() {
        console.log(process.env.REACT_APP_APIKEY)
        console.log(this.state.data)
        // this.setState({city: this.props.city})
        // console.log(this.state.coords['London'])
        let timestamp, date, dayOfWeek;
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return (
            <div>
                <div class="btn-group-lg btn-group-horizontal">
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="New York">New York</Button> 
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="London">London</Button>  
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="Tokyo">Tokyo</Button>
                </div>

                <div style={{fontFamily: "Helvetica", fontSize: "2em"}}>Location: {this.state.city}</div>
                <br/>

                {/* Template for a day forecast*/}
                <CardGroup>
                {this.state.data.map(function(index){
                    timestamp = index.dt
                    date = new Date(timestamp*1000)
                    dayOfWeek = days[date.getDay()]
                    return(
                        <Card style={{ width: '18rem', margin: "auto", fontFamily: "Helvetica" }}>
                            <Card.Header>{dayOfWeek}</Card.Header>
                            <Card.Img variant="top" src={`${process.env.REACT_APP_IMAGEURL}${index.weather[0].icon}@2x.png`} style={{width: "45%", display: "block", margin: "auto"}}/>
                            <Card.Title style={{fontSize:"1.5em", fontWeight:"bold"}}>{Math.round(index.temp.day)}°F</Card.Title>
                            <Card.Body>
                                <Card.Text>
                                    {index.weather[0].description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
                </CardGroup>




            </div>
        )
    }
}
