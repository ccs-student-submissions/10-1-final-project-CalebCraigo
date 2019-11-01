import React from 'react';
import Map from './../containers/Map.js';

import '../Base.css';
// import Map from '../containers/Map';

// import '../Aside.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function Base(props) {

  let restaurant = {
    lat: '',
    lng: ''
  }

  let randomGenerator = () => {
  // axios.get("https://developers.zomato.com/api/v2.1/search?lat=34.8526&lon=-82.3940&radius=8000&key=5ff1c6015f3549f838e7d3a54deb7e8f");
    restaurant = {
      lat: '12',
      lng: '23'
    }
  }



  return (
    <div className='row'>
      <Map restaurant={restaurant}/>
      <aside>
        {props.children}
        <button type='button' onClick={randomGenerator}>Random Generator</button>
      </aside>

    </div>
  );
}

export default Base;
