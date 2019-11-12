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
    let highlightStr = highlights.toString()
    let highlightNewStr = highlightStr.replace(/,/g, ', ');
    console.log(highlightNewStr)


    let userHighlight = []
    console.log(userHighlight)
    let userHighlights = (this.props.profile.highlights)
    console.log(userHighlights)
    // let highlights = [...this.state.profile.highlights]

    console.log(this.props)
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
        <h5>Highlights</h5>
        <p>{highlightNewStr}</p>



      </div>
    );
  }
};

export default RestaurantDetail;
