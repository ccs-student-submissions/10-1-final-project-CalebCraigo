import React, {Component} from "react";
import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json')


class MyMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
      restuarant: [],
    };
  }
  // componentDidMount() {
  //   const restuarants = async () => {
  //       return await axios.get(`https:maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBm5r5sZESK6Jo8pWiLFjkGvpGJ010ED9I`,
  //       params: {
  //         fields: 'types';
  //       }
  //     })
  //   }
  // }

  render() {

    return (
        <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 34.8526, lng: -82.3940 }}
        defaultOptions={{
          disableDefaultUI: true,
          draggable: true,
          keyboardShortcuts: false,
          scaleControl: true,
          scrollwheel: true,
          styles: styles}}

        />
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
