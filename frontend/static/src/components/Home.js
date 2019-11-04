import React, {Component} from "react";
// import axios from 'axios';
// import randomGenerator from '../containers/Map';

class Home extends Component {
  // constructor(props){
  //   super(props);
  // // this.randomGenerator = this.randomGenerator.bind(this);
  // }


  render() {
    return (
      <React.Fragment>
      <h1>Shut Up & Eat</h1>
      <a href='/login/'>Sign In</a>
      <a href='/signup/'>Sign up</a>
      {/* only show profile link if user is logged in */}
      {localStorage.getItem('my-app-user') ? (
        <a href='/profile/'>Profile</a>
      ): (
        null
      )}
      </React.Fragment>
    )
  }
}

export default Home;
