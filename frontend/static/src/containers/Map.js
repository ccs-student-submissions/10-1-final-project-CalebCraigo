import React, {Component} from "react";
// import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Aside from './../components/Aside.js'

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json');


class MyMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
      restaurantLocation: { lat: 32, lng: 32},
      userLocation: { lat: 32, lng: 32},
      loading: true,
    };
  }

  componentDidMount(props) {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        console.log(this.state.userLocation)
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  static getDerivedStateFromProps(props, state) {
      return {
        restaurantLocation: {lat:props.restaurantLocation.lat, lng:props.restaurantLocation.lng}

      }
      console.log(this.state.restaurantLocation.lat)
}


  render() {

    console.log('map props', this.state.restaurantLocation, this.state.userLocation);
    const { loading, userLocation, restaurantLocation } = this.state;
    if (loading) {
      return null;
    }

    console.log('userLocation', userLocation)
    console.log('restaurantLocation', restaurantLocation)
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
        <Marker position={ restaurantLocation }/>
        </GoogleMap>

    )
  }
}

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
                restaurantLocation={props.restaurantLocation}
                />
        </div>
    )
}
