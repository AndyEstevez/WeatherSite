import React, { Component } from 'react'

export default class Forecast extends Component {
    constructor(){
        super();
        this.state = {
            weather: [
                { day: "Monday", date: "January 1st", temp: "70°F",description: "cloudy" },
                { day: "Tuesday", date: "January 2nd", temp: "60°F",description: "sunny" },
                { day: "Wednesday", date: "January 3rd", temp: "77°F",description: "rainy" },
                { day: "Thursday", date: "January 4th", temp: "74°F",description: "clear sky" },
                { day: "Friday", date: "January 5th", temp: "82°F",description: "foggy" },
            ],
            data: [],
            city: "London",
            coords: {
                "New York": { lat: 40.7143, lon: -74.006 },
                "London": { lat: 51.5085, lon: -0.1257 },
                "Tokyo": { lat: 35.6895, lon: 139.6917 }
            }
        }
    }

    async componentDidMount(){
       await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${process.env.REACT_APP_APIKEY}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data: result
                }, console.log(result))
            })
    }
    render() {
        console.log(process.env.REACT_APP_APIKEY)
        console.log(this.state.data)
        console.log(this.state.coords['London'])
        return (
            <div>
                <div>Location: New York</div>
                <br/>
                {/* Template for a day forecast*/}
                {this.state.weather.map(function(index){
                    return(
                        <div>
                            <div>{index.day}</div>
                            <div>{index.date}</div>
                            <div>{index.temp}</div>
                            <div>{index.description}</div>
                            <br/>
                        </div>
                    )
                })}




            </div>
        )
    }
}
