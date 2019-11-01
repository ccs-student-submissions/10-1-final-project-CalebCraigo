import React, {Component} from "react";
// import axios from 'axios';
import randomGenerator from '../containers/Map';

class Home extends Component {
  constructor(props){
    super(props);
  // this.randomGenerator = this.randomGenerator.bind(this);
  }


  render() {
    return (
      <div>
        <h1>Shut Up & Eat</h1>
        <button onClick={this.randomGenerator}>Click Here!</button>
        <a href='/login/'>Sign In</a>
        <a href='/signup/'>Sign up</a>
      </div>
    )
  }
}

export default Home;
