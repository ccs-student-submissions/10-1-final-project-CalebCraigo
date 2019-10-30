import React from 'react';
import '../Base.css';
import Map from '../containers/Map';

import '../Aside.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function Base(props) {
  return (

    <main className='container-fluid'>
    <section className='row map'>
      <Map />
    </section>
      <section className='row'>
        <div className='col-md-3 col-sm-12 aside-box'>
        {props.children}
        </div>
      </section>
    </main>
  );
}

export default Base;
