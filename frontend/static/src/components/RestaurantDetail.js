import React, {Component} from 'react';


class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newrestaurant: [],
    };
  }

  componentDidMount(props) {
    this.setState({newrestaurant: this.props.restaurant})


  }

  render(props, state){
    let highlights = (this.props.restaurant.restaurant.highlights)
    let restaurantHighlightStr = highlights.slice(0, 5).toString()
    let restaurantHighlightNewStr = restaurantHighlightStr.replace(/,/g, ', ');
    console.log('restaurant', highlights)
    let userHighlight = []
    console.log('user', userHighlight)
    let userHighlights = (this.props.profile.highlights)
    userHighlights.forEach(function(item){
      return userHighlight.push(item.text)
    })


    const finalarray =[];
    function compare(arr1, arr2) {
    arr1.forEach((e1)=>arr2.forEach((e2)=>
      {if(e1 === e2){
        finalarray.push(e1)
      }
    }
  ));
  }

    compare(userHighlight, highlights)
    let highlightStr = finalarray.toString()
    let highlightNewStr = highlightStr.replace(/,/g, ', ');
    return (
      <div>
        <h5>Name</h5>
        <h3>{this.props.restaurant.restaurant.name}</h3>
        <h5>Cuisine</h5>
        <p>{this.props.restaurant.restaurant.cuisines}</p>
        <h5>Address</h5>
        <p>{this.props.restaurant.restaurant.location.address}</p>
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
