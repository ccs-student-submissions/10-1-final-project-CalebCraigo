import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './components/Title'
import Aside from './containers/Aside';
import Login from './components/Login';
import SignUp from './components/Signup';
import ProfileCreate from './containers/ProfileCreate';
import ProfileDetails from './components/ProfileDetails';
import Base from './components/Base';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Base>
          <Switch>
            <Route path='/profile/create/' component={ProfileCreate} />
            <Route path='/profile/:id' component={ProfileDetails} />
            <Route path='/login/' component={Login} />
            <Route path='/signup/' component={SignUp} />
            <Route path='/result/' component={Aside} />
            <Route exact path='/' component={Title} />
          </Switch>
    </Base>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
