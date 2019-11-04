import React, {Component} from 'react';
// import Base from './Base.js';


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
  }
//   static getDerivedStateFromProps(props, state) {
//       return {
//         newrestaurant: props.restaurant
//       };
//         console.log(this.state.newrestaurant)
// }
  render(props, state){

    // console.log('restraunt blah',this.state.newrestaurant.restaurant.name);
    // let restaurant = this.state.restaurant.map((item, index) => {
    //     return <div>{item.name}</div>
    // })restaurant.restaurant.name
    return (
      <div>
      <h2>{this.props.restaurant.restaurant.name}</h2>
      <p>{this.props.restaurant.restaurant.cuisines}</p>
      <p>{this.props.restaurant.restaurant.timings}</p>

      </div>
    );
  }
};

export default RestaurantDetail;
