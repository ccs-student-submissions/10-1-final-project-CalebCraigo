import React, {Component} from "react";
import axios from 'axios';


class Restaurants extends Component {
  constructor(props){
    super(props);
    this.state = {
      catergory: '',
    };
  }

catergories = () => {
  axios.get('https://developers.zomato.com/api/v2.1/categories');
  console.log('here')
  console.log('https://developers.zomato.com/api/v2.1/categories');
}

  render(){
    console.log('here')
    return(
      <p>here</p>
    )
  }
}

export default Restaurants;
