import React, { Component } from 'react';

import Display from './Display/Display.jsx';
import Edit from './Edit/Edit.jsx';

import {
  HashRouter as Router,
  Route,
  Redirect
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
        <h1>Welcome to NoriBento!</h1>
        <h5>Go to 'localhost:8000/#/display' to go to the Display Page</h5>
        <h5>Go to 'localhost:8000/#/edit' to go to the Edit Page</h5>
        <Router>
          <div>
            <Redirect from='/' to='/' />
            <Route path='/display' component={Display} />
            <Route path='/edit' component={Edit} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;