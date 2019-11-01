import React, {Component} from "react";
// import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Aside from './../components/Aside.js'

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
console.log(getRandomInt(0, 2294));

class MyMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
      restaurant: { lat: 32, lng: 32},
      userLocation: { lat: 32, lng: 32},
      loading: true,
    };

    // this.randomGenerator = this.randomGenerator.bind(this);
  }
  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }


  render() {
    console.log('map props', this.props);
    const { loading, userLocation } = this.state;

    if (loading) {
      return null;
    }


    return (

        <GoogleMap
        defaultZoom={15}
        defaultCenter={ userLocation }
        defaultOptions={{
          disableDefaultUI: true,
          draggable: true,
          keyboardShortcuts: false,
          scaleControl: true,
          scrollwheel: true,
          styles: styles}}
        >
          <Marker position= { userLocation } />
        </GoogleMap>

    )
  }
}
//
//
//
//
const WrappedMap = withScriptjs(withGoogleMap(MyMap));

export default function Map(props){
  console.log('wrapped map', props)
    return(
        <div className='map'>

            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBm5r5sZESK6Jo8pWiLFjkGvpGJ010ED9I`}
                loadingElement={<div style={{height: "100% "}} />}
                containerElement={<div style={{height: "100% "}} />}
                mapElement ={<div style={{height: "100% "}} />}
                restaurant={props.restaurant}
                />
        </div>
    )
}
