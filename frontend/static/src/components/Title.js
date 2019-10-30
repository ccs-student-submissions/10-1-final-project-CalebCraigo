import React, {Component} from "react";
// import axios from 'axios';
import '../Aside.css';


class Title extends Component {

  render() {
    return (
      <div>
        <h1>Shut Up & Eat</h1>
        <button>Click Here!</button>
        <a href='/login/'>Sign In</a>
        <a href='/signup/'>Sign up</a>
      </div>
    )
  }
}

export default Title;
