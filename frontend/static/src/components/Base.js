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
      start: 0,
      highlights: [],
      highlight: '',
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



    let headers = null;

    if(localStorage.getItem('my-app-user')) {
      headers = {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`
      }
    }

    axios.get(`/api/v1/profile/detail/`, {headers: headers})
    .then(res => {

      let highlight = []
      this.setState({profile: res.data[0]})
      this.setState({highlights: this.state.profile.highlights})
      let highlights = [...this.state.profile.highlights]
      highlights.forEach(function(item){
        return highlight.push(item.text)
      })
      let highlightStr = highlight.toString()
      let highlightNewStr = highlightStr.replace(/,/g, ' ');
      let highlightsURL = encodeURI(highlightNewStr)
      this.setState({highlight: highlightsURL})
      // console.log(highlightStr)
      // console.log(highlightNewStr)
      // console.log(highlightsURL)
      // console.log(this.state.highlight)
    })
    .catch(error =>{
      console.log(error);
    });
   }

  randomGenerator(){
    //https://developers.zomato.com/api/v2.1/search?q=nightlife%2C%20gastro%20pub&lat=34.8526&lon=-82.3940&radius=8000
    axios.get(`https://developers.zomato.com/api/v2.1/search?lat=${this.state.userCoords.lat}&lon=${this.state.userCoords.lng}&start=${this.state.start}&count=20&radius=8000&q=${this.state.highlight}&apikey=5ff1c6015f3549f838e7d3a54deb7e8f`)
    .then(res => {
      let restaurant = res.data.restaurants[Math.floor(Math.random()*res.data.restaurants.length)];
      this.setState({restaurant, start: this.state.start + 20});
      console.log(this.state.restaurant.restaurant.highlights)
      // console.log(this.state.restaurantLocation)
      this.setState({restaurantSelected: true});
      console.log(this.state.restaurant)
      })
    .catch(error => {
      console.log(error);
    });
    console.log('randomGenerate is firing');
    }

  render(){
    // console.log(this.props)
    // console.log(this.props.profile)
    // console.log(localStorage)
    return (
      <div className='row'>
        <Map restaurantLocation={this.state.restaurant ? {lat: Number(this.state.restaurant.restaurant.location.latitude), lng: Number(this.state.restaurant.restaurant.location.longitude)} : {lat: 32, lng: 32}}/>
      <aside>
          {this.props.children}
          {this.state.start === 60 ? (
            <p>Stop being picky! Shut up and Eat!</p>
          ):(
            <button className='btn btn-secondary btn-lg' type='button' onClick={this.randomGenerator}>Random Generator</button>
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
