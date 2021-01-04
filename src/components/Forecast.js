import React, { Component } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { cityChanged } from '../actions/actions';

class Forecast extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            city: "",
            coords: {
                "New York": { lat: 40.7143, lon: -74.006 },
                "London": { lat: 51.5085, lon: -0.1257 },
                "Tokyo": { lat: 35.6895, lon: 139.6917 }
            }
        }
    }
    async componentDidMount(){
        //    this.setState({city: this.props.city})
            // console.log("COMPONENT DID MOUNT: " + this.props.city)
           await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords[this.props.city].lat}&lon=${this.state.coords[this.props.city].lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        data: result.daily.slice(0, 5)
                    })
                })
        }
    
    handleClick = (e) => {
        e.preventDefault();
        this.props.dispatch(cityChanged(e.target.value));
        // console.log("HANDLE CLICK: " + e.target.value)
        // console.log("props: " + this.props.city)
        // console.log("event: " + e.target.value)
        // console.log("state: " + this.state.city)

    }
    componentDidUpdate(prevProps){
        // console.log("IN COMPONENT DID UPDATE: " + this.props.city)
        if (this.props.city !== prevProps.city) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords[this.props.city].lat}&lon=${this.state.coords[this.props.city].lon}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        data: result.daily.slice(0, 5),
                    })
                })
        }
    }
    render() {
        // console.log(this.state.data)
        let timestamp, date, dayOfWeek;
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        
        return (
            <div>
                <div className="btn-group-lg btn-group-horizontal">
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="New York">New York</Button> 
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="London">London</Button>  
                    <Button size="lg" style={{marginRight: "20px", width: "25%"}} onClick={this.handleClick} value="Tokyo">Tokyo</Button>
                </div>

                <div style={{fontFamily: "Helvetica", fontSize: "2em"}}>Location: {this.props.city}</div>
                <br/>

                {/* Template for a day forecast*/}
                <CardGroup>
                {this.state.data.map(function(index){
                    timestamp = index.dt
                    date = new Date(timestamp*1000)
                    dayOfWeek = days[date.getDay()]
                    return(
                        <Card style={{ width: '18rem', margin: "auto", fontFamily: "Helvetica" }} key={index.dt}>
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

const mapStateToProps = (state) => {
    const {city} = state
    return city;
}

export default connect(mapStateToProps)(Forecast);
