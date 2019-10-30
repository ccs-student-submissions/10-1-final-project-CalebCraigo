import React, {Component} from "react";
// import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json')


class MyMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
      restaurant: [],
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
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

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

export default function Map(){

    return(
        <div style={{ width:"100vw", height:"100vh" }}>

            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBm5r5sZESK6Jo8pWiLFjkGvpGJ010ED9I`}
                loadingElement={<div style={{height: "100% "}} />}
                containerElement={<div style={{height: "100% "}} />}
                mapElement ={<div style={{height: "100% "}} />}

                />
        </div>
    )
}
