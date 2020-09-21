import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import Admin from 'pages/admin';
import Login from 'pages/login';
import OpenMap from 'pages/openmap';
import NotFound from 'pages/not-found';

import requireAuth from 'utils/auth/authorization';

import s from './App.scss';


class App extends Component {

  state = {
    loggedIn: false
  }

  componentWillMount() {
   const loggedIn = Boolean(localStorage.getItem('loggedIn'));
   // console.log('App#componentWillMount', loggedIn);
   this.setState({ loggedIn });
  }

  render() {
    const loggedIn = false;
    return (
      <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/">
                  { this.state.loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/login" component={Login} />
                <Route path="/dashboard" component={requireAuth(Admin)} />
                <Route path="/map" component={OpenMap} />
                <Route component={NotFound} />
              </Switch>
            </div>
      </BrowserRouter>
    );
  }
}

export default hot(App);
