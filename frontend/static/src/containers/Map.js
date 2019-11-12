import React, {Component} from "react";
import axios from 'axios';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

import userImage from '../images/user-circle-solid.svg';
import restaurantImage from '../images/utensils-solid.svg'


// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json');


class MyMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
      restaurantLocation: { lat: 32, lng: 32},
      userLocation: { lat: 32, lng: 32},
      loading: true,
      bounds: null,
      profile: {},
      markerImage: '',
    };
    // this.handleMapMounted = this.handleMapMounted.bind(this)
    // this.onBoundsChanged = this.onBoundsChanged.bind(this)
  }

  componentDidMount() {
    let headers = null;

    if(localStorage.getItem('my-app-user')) {
      headers = {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).token}`
      }
    }
    axios.get(`/api/v1/profile/detail/`, {headers: headers})
    .then(res => {

    console.log(res.data[0].highlights);
    this.setState({profile: res.data[0]});
    this.setState({markerImage: this.state.profile.avatar})
    })

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false

        });
        // console.log(this.state.userLocation)
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
      // console.log(this.state.restaurantLocation.lat)
  }

  handleMapMounted = (map) => {
    // const { path } = this.props
    //
    // this._map = map
    // if (map) {
    // const bounds = new window.google.maps.LatLngBounds();
    //
    // path.map(position => {
    //   bounds.extend(position)
    // })
    // this._map.fitBounds(bounds)
    // }
  }



  render(props) {
    console.log(this.state.profile)
    console.log(this.state.markerImage)
    // console.log('map props', this.state.restaurantLocation, this.state.userLocation);
    const { loading, userLocation, restaurantLocation } = this.state;
    if (loading) {
      return null;
    }

    // console.log('userLocation', userLocation)
    // console.log('restaurantLocation', restaurantLocation)
    let bounds = new window.google.maps.LatLngBounds();
    let latLng = new window.google.maps.LatLng(this.state.userLocation.lat, this.state.userLocation.lng);
    bounds.extend(latLng);

    latLng = new window.google.maps.LatLng(this.state.restaurantLocation.lat, this.state.restaurantLocation.lng);
    bounds.extend(latLng);
    // bounds.extend()
    // const locations = [this.state.userLocation, this.state.restaurantLocation];
    // const coordinates = locations.map()
    // locations.push((this.state.userLocation).push(this.state.restaurantLocation);)


    return (

        <GoogleMap
          ref={map => map && map.fitBounds(bounds, {padding: 120})}
          defaultZoom={15}
          minZoom={5}
          defaultCenter={ userLocation }
          defaultOptions={{
            disableDefaultUI: true,
            draggable: true,
            keyboardShortcuts: false,
            scaleControl: true,
            scrollwheel: true,
            styles: styles,

            }}
          >
          <Marker
          position= { userLocation }
          title='Your Location'
          icon={{
            url: userImage,
            scaledSize: new window.google.maps.Size(30, 30)
          }}

           />
          <Marker
          position={ restaurantLocation }
          title='Restaurant Location'
          icon={{
            url: restaurantImage,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
          />
        </GoogleMap>

    )
  }
}

const WrappedMap = withScriptjs(withGoogleMap(MyMap));

export default function Map(props){
  // console.log('wrapped map', props)
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
