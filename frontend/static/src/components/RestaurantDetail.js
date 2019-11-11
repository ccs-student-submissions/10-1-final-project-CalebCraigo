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
    console.log(this.props.restaurant)
    console.log(this.props.restaurant.restaurant.timings)
  }

  render(props, state){
    console.log(this.props)
    return (
      <div>
        <h2>{this.props.restaurant.restaurant.name}</h2>

        <p>{this.props.restaurant.restaurant.cuisines}</p>
        <div>
        <p>{this.props.restaurant.restaurant.timings}</p>
        </div>

      </div>
    );
  }
};

export default RestaurantDetail;
