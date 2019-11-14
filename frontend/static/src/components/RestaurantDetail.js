import React, {Component} from 'react';


class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHighlights: [],
      highlights: [],
      userCoords: {},
    };
    this.googleDirections = this.googleDirections.bind(this)
  }

  // componentDidMount(props) {
  //   this.setState({newrestaurant: this.props.restaurant})
  // }
  static getDerivedStateFromProps(props, state) {
      return {
        highlights: props.restaurant.restaurant.highlights,
        userHighlights: props.profile.highlights,
        userCoords : props.userCoords
      }
  }

  googleDirections(){
  let url = 'https://www.google.com/maps/dir/?api=1&';
  let origin = 'origin=' + this.state.userCoords.lat + ',' + this.state.userCoords.lng;
  let destination = '&destination=' + this.props.restaurant.restaurant.location.latitude + ',' + this.props.restaurant.restaurant.location.longitude;
  let newUrl = new URL(url + origin + destination);
  let wind = window.open(newUrl, '_blank');
    wind.focus()
    console.log(origin)
  }


  render(){

    console.log(this.state.userCoords)
    console.log('props of detail', this.props)

    console.log('restaurant', this.state.highlights)
    let restaurantHighlightStr = this.state.highlights.slice(0, 5).toString()
    let restaurantHighlightNewStr = restaurantHighlightStr.replace(/,/g, ', ');
    let userHighlight = []
    // if (localStorage.getItem('my-app-user')) {
    // causes white screen on heroku, refresh screen and works fine.
    let userHighlights = (this.state.userHighlights)
      userHighlights.forEach(function(item){
        return userHighlight.push(item.text)
      })
    // }

    const finalarray =[];
    function compare(arr1, arr2) {
    arr1.forEach((e1)=>arr2.forEach((e2)=>
      {if(e1 === e2){
        finalarray.push(e1)
      }
    }
  ));
  }
    compare(userHighlight, this.state.highlights)
    let highlightStr = finalarray.toString()
    let highlightNewStr = highlightStr.replace(/,/g, ', ');




    return (
      <div>
        <h5>Name</h5>
        <h3>{this.props.restaurant.restaurant.name}</h3>
        <h5>Cuisine</h5>
        <p>{this.props.restaurant.restaurant.cuisines}</p>
        <h5>Address</h5>
        <button className='directionsbtn' onClick={this.googleDirections}>{this.props.restaurant.restaurant.location.address}</button>
        <h5>Hours</h5>
        <p>{this.props.restaurant.restaurant.timings}</p>
        {highlightNewStr ? (
          <React.Fragment>
            <h5>Highlights</h5>
            <p>{highlightNewStr}</p>
          </React.Fragment>
        ): (
          <React.Fragment>
            <h5>Highlights</h5>
            <p>{restaurantHighlightNewStr}</p>
          </React.Fragment>
        )}




      </div>
    );
  }
};

export default RestaurantDetail;
