import React from 'react';
import '../Base.css';
import Map from '../containers/Map';

import '../Aside.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function Base(props) {
  return (

    <main className='container-fluid'>
    <section className='row map'>
      <Map />
    </section>
      <section className='row asideBox'>
        {props.children}
      </section>
    </main>
  );
}

export default Base;
