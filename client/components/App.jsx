import React, { Component } from 'react';

import Main from './Main.jsx';
import Nav from './Nav/Nav.jsx';
import Display from './Display/Display.jsx';
import Landing from './Landing/Landing.jsx';
import Edit from './Edit/Edit.jsx';
import User from './User/User.jsx';

import {
  HashRouter as Router,
  hashHistory,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Redirect from='/' to='/' />
            <Route exact path='/' component={() => <Landing/>} />
            <Route path='/display' component={() => <Display/>} />
            <Route path='/landing' component={() => <Landing/>}/>
            <Route path='/edit' component={() => <Edit/>} />
            <Route path='/user' component={() => <User/>} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;