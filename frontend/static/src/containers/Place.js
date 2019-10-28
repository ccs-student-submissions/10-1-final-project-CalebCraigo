// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%',
// };


// class MapContainer extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       restaurant: [{latitude: 34.8396, longitude: -82.3997}],
//       userLocation: [{latitude: 34.8403, longitude: -82.3983}],
//       showAside: false
//     }
//   }
//   displayMarkers = () => {
//     return this.state.restaurant.map((store, index) => {
//       return <Marker key={index} id={index} position={{
//        lat: store.latitude,
//        lng: store.longitude
//      }}
//      onClick={() => console.log("You clicked me!")} />
//    })
//   }
//
//   userMarkers = () => {
//     return this.state.userLocation.map((store, index) => {
//       return <Marker key={index} id={index} position={{
//        lat: store.latitude,
//        lng: store.longitude
//      }}
//      onClick={() => console.log("You clicked me!")} />
//    })
//   }

  // testMethod = () => {
  //   console.log('here i am');
  //   this.setState({showAside: true});
  // }

// render() {
//
//   let content;
//
//   if(this.state.showAside) {
//       content = <div>I am the aside</div>
//   } else {
//     content = <div>I am the button</div>
//   }
//
//   return (
//       <React.Fragment>
//       {content}
//       <Map
//         google={this.props.google}
//         zoom={12}
//         style={mapStyles}
//         initialCenter={{ lat: 34.8526, lng: -82.3940}}
//       >
//         {this.displayMarkers()}
//         {this.userMarkers()}
//       </Map>
//       <button type='button' onClick={this.testMethod}>Click Me</button>
//       </React.Fragment>
//   );
// }
// }
