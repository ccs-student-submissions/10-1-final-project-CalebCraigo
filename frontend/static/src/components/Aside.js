import React, {Component} from "react";
import './Aside.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Aside extends Component {

  render() {

    return (
      <div className='aside-box'>
        <button type='button' onClick={this.randomGenerator}>HEY A BUTTON</button>
      </div>
    )
  }
}

export default Aside;
