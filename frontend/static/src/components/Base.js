import React, {Component} from 'react';
import Map from './../containers/Map.js';
import axios from 'axios';
import '../Base.css';
// import Map from '../containers/Map';

// import '../Aside.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantLocation: { lat: '', lng: ''},
      restaurantIndex: '',
      restaurant: {}
    };
    this.randomGenerator = this.randomGenerator.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }


getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
randomGenerator(min, max){
  axios.get(`https://developers.zomato.com/api/v2.1/search?lat=34.8526&lon=-82.3940&radius=8000&apikey=5ff1c6015f3549f838e7d3a54deb7e8f`)
  .then(res => {
    this.setState({restaurant:res.data.restaurants[Object.keys(res.data.restaurants)[this.getRandomInt(0, 21)]]});
    this.setState({restaurantLocation: {lat: Number(this.state.restaurant.restaurant.location.latitude), lng: Number(this.state.restaurant.restaurant.location.longitude)}});
    console.log(this.state.restaurant);
    console.log(this.state.restaurantLocation);
  })
  .catch(error => {
    console.log(error);
  });

  console.log('randomGenerate is firing');

  }

  render(){
    return (
      <div className='row'>
        <Map restaurantLocation={this.state.restaurantLocation}/>
        <aside>
          {this.props.children}
          <button type='button' onClick={this.randomGenerator}>Random Generator</button>
        </aside>
      </div>
    );
  }
}

export default Base;
