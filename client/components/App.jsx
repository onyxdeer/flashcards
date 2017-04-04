import React, { Component } from 'react';

import Main from './Main.jsx';
import Nav from './Nav/Nav.jsx';
import Display from './Display/Display.jsx';
import Landing from './Landing/Landing.jsx';
import Edit from './Edit/Edit.jsx';
import Search from './Search/Search.jsx';
import User from './User/User.jsx';
import Voice from './Voice/Voice.jsx';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const searchRedirectPath = {
  pathname: 'search'
}

let TargetRoute = () => ( <Redirect from='/' to='/' /> )

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      searchActive: false,
      searchEnded: false
    }

    this.handleNavSearch = this.handleNavSearch.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
    this.endNavSubmit = this.endNavSubmit.bind(this);
  }

  handleNavSearch(event) {
    var context = this;
    this.setState({
      query: event.target.value,
    }, () => { console.log('handleNavSearch query:', context.state.query); } );
  }

  handleNavSubmit(event) {
    event.preventDefault();
    console.log('handleNavSubmit called with', this.state.query);
    this.setState({
      searchActive: true
    });
  }

  endNavSubmit() {
    if (this.state.searchActive === true) {
      this.setState({
        searchActive: false
      });
    }
  }


  render() {

    if (this.state.searchActive) {
      TargetRoute = () => ( <Redirect to='/search' /> )
    }

    return (
      <div>
        <Router>
          <div>
            <Nav handleNavSearch={this.handleNavSearch} handleNavSubmit={this.handleNavSubmit} query={this.state.query} />
            <TargetRoute />
            <Route exact path='/' component={() => <Landing />} />
            <Route path='/display' component={() => <Display />} />
            <Route path='/landing' component={() => <Landing />} />
            <Route path='/edit' component={() => <Edit />} />
            <Route path='/search' component={() => <Search query={this.state.query} endNavSubmit={this.endNavSubmit} />} />
            <Route path='/user' component={() => <User />} />
            <Route path='/voice' component={() => <Voice />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;