import React, {Component} from 'react';
// import { Redirect } from 'react-router-dom';
import Map from './../containers/Map.js';
import RestaurantDetail from './RestaurantDetail.js';
import axios from 'axios';
import '../Base.css';
// import Map from '../containers/Map';

// import '../Aside.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';




class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantLocation: { lat: null, lng: null},
      userLocation: { lat: null, lng: null},
      restaurantIndex: '',
      restaurant: {},
      restaurantSelected: false,
      navigate: false,
      breakfast: false,
      lunch: false,
      dinner: false,
      outdoorseating: false,
      vegetarian: false,
      glutenfree: false,
      alcohol: false,
      kidfriendly: false,
      nightlife: false,
      delivery: false,
    };
    this.randomGenerator = this.randomGenerator.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }

  componentDidMount(props) {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        // console.log(this.state.userLocation);
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }
  getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  randomGenerator(min, max){
    console.log('here');
    axios.get(`https://developers.zomato.com/api/v2.1/search?lat=${this.state.userLocation.lat}&lon=${this.state.userLocation.lng}&radius=8000&apikey=5ff1c6015f3549f838e7d3a54deb7e8f`)
    .then(res => {
      this.setState({restaurant:res.data.restaurants[Object.keys(res.data.restaurants)[this.getRandomInt(0, 21)]]});
      this.setState({restaurantLocation: {lat: Number(this.state.restaurant.restaurant.location.latitude), lng: Number(this.state.restaurant.restaurant.location.longitude)}});
      this.setState({restaurantSelected: true});
      // this.props.history.push('/restaurant/');

      console.log(this.state.restaurant);
      // console.log(this.state.restaurantLocation);
    })
    .catch(error => {
      console.log(error);
    });

    console.log('randomGenerate is firing');


    }

  render(){
    console.log(this.props)
    // const restaurant = this.state.restaurantSelected;
    // let restaurantDetail;
    // if (restaurant === false){
    //   restaurantDetail =  null;
    // }else{
    // restaurantDetail =  <RestaurantDetail restaurant={this.state.restaurant} />
    // }
    //

    return (
      <div className='row'>
        <Map restaurantLocation={this.state.restaurantLocation}/>

      <aside>

          {this.props.children}

          <button type='button' onClick={this.randomGenerator}>Random Generator</button>

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
