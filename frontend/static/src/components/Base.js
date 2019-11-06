import React, {Component} from 'react';
// import { Redirect } from 'react-router-dom';
import Map from './../containers/Map.js';
import RestaurantDetail from './RestaurantDetail.js';
import axios from 'axios';
import '../Base.css';
// import Map from '../containers/Map';

// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCoords: null,
      // restaurantLocation: { lat: null, lng: null},
      restaurant: null,
      restaurantSelected: false,
      profile:{},
      start: 0
    };
    this.randomGenerator = this.randomGenerator.bind(this);
    // this.userPreference = this.userPreference.bind(this);
  }

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userCoords: { lat: latitude, lng: longitude },
        });
      }
    );
  }

  // componentDidMount() {
  //   axios.get(`/api/v1/profile/detail/${this.state.profile.id}`)
  //   .then(res => {
  //     console.log('here')
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   });
  // }

  randomGenerator(){
    axios.get(`https://developers.zomato.com/api/v2.1/search?lat=${this.state.userCoords.lat}&lon=${this.state.userCoords.lng}&start=${this.state.start}&count=20&radius=8000&apikey=5ff1c6015f3549f838e7d3a54deb7e8f`)
    .then(res => {
      let restaurant = res.data.restaurants[Math.floor(Math.random()*res.data.restaurants.length)];
      this.setState({restaurant, start: this.state.start + 20});
      console.log(this.state.restaurant)
      // this.setState({restaurantLocation: {lat:this.state.restaurant.restaurant.location.latitude, lng:this.state.restaurant.restaurant.location.longitude}});
      // console.log(this.state.restaurantLocation)
      this.setState({restaurantSelected: true});
      })
    .catch(error => {
      console.log(error);
    });
    console.log('randomGenerate is firing');
    }

  render(){
    // console.log(this.props)
    // console.log(this.props.profile)
    console.log(localStorage)
    return (
      <div className='row'>
        <Map restaurantLocation={this.state.restaurant ? {lat: Number(this.state.restaurant.restaurant.location.latitude), lng: Number(this.state.restaurant.restaurant.location.longitude)} : {lat: 32, lng: 32}}/>
      <aside>
          {this.props.children}
          {this.state.start === 60 ? (
            <p>Stop being picky! Shut up and Eat here!</p>
          ):(
            <button type='button' onClick={this.randomGenerator}>Random Generator</button>
          )}
          {/* only show RestaurantDetail component if random restaurant was selected */}
          {this.state.restaurantSelected ? (
            <RestaurantDetail restaurant={this.state.restaurant} />
          ) : (
            null
          )}
        </aside>
      </div>
    );
  }
}

export default Base;
