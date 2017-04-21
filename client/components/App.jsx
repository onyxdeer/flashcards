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
import Explore from './User/Explore.jsx';
import User from './User/User.jsx';
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

    // if (location.pathname.startsWith('/id=')) {
    //   console.log('DETECTED SHORTENED LINK:', location.pathname.slice(4, location.pathname.length));
    // } else if (location.pathname === '/edit' || location.pathname === '/Edit' || location.pathname === '/create' || location.pathname === '/Create') {
    //   TargetRoute = () => ( <Redirect to='/edit' /> )
    // } else if (location.pathname === '/user' || location.pathname === '/User' || location.pathname === '/home' || location.pathname === '/Home') {
    //   TargetRoute = () => ( <Redirect to='/user' /> )
    // }    

    // this.state = {
    //   query: '',
    //   searchActive: false,
    //   userId: 'guest',
    //   bentoId: null
    // }

    // this.handleNavSubmit = this.handleNavSubmit.bind(this);
    // this.endNavSubmit = this.endNavSubmit.bind(this);
    // this.setBentoId = this.setBentoId.bind(this);
    // this.setUserId = this.setUserId.bind(this);

    if (location.pathname.startsWith('/id=')) {
      console.log('DETECTED SHORTENED LINK:', location.pathname.slice(4, location.pathname.length));
      this.props.getShortenerId(location.pathname.slice(4, location.pathname.length));
      TargetRoute = () => ( <Redirect to='/display' /> )
    } else if (location.pathname === '/edit' || location.pathname === '/Edit' || location.pathname === '/create' || location.pathname === '/Create') {
      TargetRoute = () => ( <Redirect to='/edit' /> )
    } else if (location.pathname === '/user' || location.pathname === '/User' || location.pathname === '/home' || location.pathname === '/Home') {
      TargetRoute = () => ( <Redirect to='/user' /> )
    } else if (location.pathname === '/explore' || location.pathname === '/Explore') {
      TargetRoute = () => ( <Redirect to='/explore' /> )
    }
  }

  // gets called when user pushes the submit button or presses enter
  // handleNavSubmit(event, input) {
  //   console.log('calling handleNavSubmit with event:', event)
  //   console.log('calling handleNavSubmit with input:', input);
  //   event.preventDefault();
  //   var context = this;
  //   this.setState({
  //     query: input,
  //     searchActive: true
  //   }, () => { 
  //     console.log('searchActive in handleNavSubmit:', context.state.searchActive);
  //     console.log('query changed to:', context.state.query);
  //    });
  // }

  // // ends the submit action
  // endNavSubmit() {
  //   if (this.state.searchActive === true) {
  //     this.setState({
  //       searchActive: false
  //     });
  //   }
  // }

  // setBentoId(id) {
  //   this.setState({
  //     bentoId: id
  //   });
  // }

  // setUserId(id) {
  //   this.setState({
  //     userId: id
  //   });
  // }

  render() {

    // triggers a redirection to Search page if 'searchActive' state is triggered from submission action
    if (this.props.searchActive) {
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
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/*<Route path="/voice" component={Voice} />*/}
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shortenerId: state.appReducer.shortenerId,
    query: state.appReducer.query,
    userId: state.appReducer.userId,
    bentoId: state.appReducer.bentoId,
    searchActive: state.appReducer.searchActive,
  };
}

export default connect(mapStateToProps, actions)(App);