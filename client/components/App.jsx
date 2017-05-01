import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  IndexRoute,
  browserHistory
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Nav from './Nav/Nav.jsx';
import Display from './Display/Display.jsx';
import Landing from './Landing/Landing.jsx';
import Edit from './Edit/Edit.jsx';
import Search from './Search/Search.jsx';
import Explore from './Browse/Explore.jsx';
import User from './Browse/User.jsx';
import Voice from './Voice/Voice.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';


import { connect } from 'react-redux';
import * as actions from '../actions/appActions.js';

// Allows redirection from current page to Search page upon search submission
let TargetRoute = () => ( <Redirect from='/' to='/' /> );

class App extends Component {
  constructor(props) {
    super(props);

    if (location.pathname.startsWith('/id=')) {
      this.props.getShortenerId(location.pathname.slice(4, location.pathname.length));
    } else if (location.pathname === '/edit' || location.pathname === '/Edit' || location.pathname === '/create' || location.pathname === '/Create') {
      TargetRoute = () => ( <Redirect to='/edit' /> )
    } else if (location.pathname === '/user' || location.pathname === '/User' || location.pathname === '/home' || location.pathname === '/Home') {
      TargetRoute = () => ( <Redirect to='/user' /> )
    } else if (location.pathname === '/explore' || location.pathname === '/Explore') {
      TargetRoute = () => ( <Redirect to='/explore' /> )
    }
  }

  render() {

    // console.log('WHAT IS GOTSHORTENERID:', this.props.gotShortenerId);
    if (this.props.gotShortenerId) {
      console.log('REDIRECTING TO DISPLAY')
      TargetRoute = () => ( <Redirect to='/display' /> );
    }

    // triggers a redirection to Search page if 'searchActive' state is triggered from submission action
    if (this.props.searchActive) {
      console.log('REDIRECTING TO SEARCH')
      TargetRoute = () => (<Redirect to="/search" />);
    }

    return (
      <div>
        <Router history={createBrowserHistory()}>
          <div>
            <Nav />
            <TargetRoute />
            <Route exact path="/" component={Landing} />
            <Route path="/display" component={Display} />
            <Route path="/landing" component={Landing} />
            <Route path="/edit" component={Edit} />
            <Route path="/search" component={() => <Search />} />
            <Route path="/explore" component={Explore} />
            <Route path="/voice" component={Voice} />
          </div>
        </Router>      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shortenerId: state.appReducer.shortenerId,
    gotShortenerId: state.appReducer.gotShortenerId,
    query: state.appReducer.query,
    userId: state.appReducer.userId,
    bentoId: state.appReducer.bentoId,
    searchActive: state.appReducer.searchActive,
  };
}

export default connect(mapStateToProps, actions)(App);
