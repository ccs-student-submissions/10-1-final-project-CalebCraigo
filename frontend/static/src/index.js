import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import SignUp from './containers/Signup';
import ProfileCreate from './containers/ProfileCreate';
import ProfileDetails from './containers/ProfileDetails';
// import Restaurants from './containers/Restaurants';
import RestaurantDetail from './components/RestaurantDetail';
import Home from './components/Home.js';
import Base from './containers/Base';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <Router>

        <Switch>
          <Base>
            <Route path='/restaurant/' component={RestaurantDetail} />
            <Route path='/profile/create/' component={ProfileCreate} />
            <Route path='/profile/' component={ProfileDetails} />
            <Route path='/login/' component={Login} />
            <Route path='/signup/' component={SignUp} />
            <Route exact path='/' component={Home} />
          </Base>
        </Switch>

      <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative|Rock+Salt&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>

  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
