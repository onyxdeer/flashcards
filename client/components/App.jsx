import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  IndexRoute
} from 'react-router-dom';

import Main from './Main.jsx';
import Nav from './Nav/Nav.jsx';
import Display from './Display/Display.jsx';
import Landing from './Landing/Landing.jsx';
import Edit from './Edit/Edit.jsx';
import Search from './Search/Search.jsx';
import User from './User/User.jsx';
import Voice from './Voice/Voice.jsx';

// Allows redirection from current page to Search page upon search submission
let TargetRoute = () => ( <Redirect from='/' to='/' /> );

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      searchActive: false,
      userId: 'guest'
    }

    // this.handleNavSearch = this.handleNavSearch.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
    this.endNavSubmit = this.endNavSubmit.bind(this);
  }

  // gets called when user pushes the submit button or presses enter
  handleNavSubmit(event, input) {
    console.log('calling handleNavSubmit with event:', event)
    console.log('calling handleNavSubmit with input:', input);
    event.preventDefault();
    var context = this;
    this.setState({
      query: input,
      searchActive: true
    }, () => { 
      console.log('searchActive in handleNavSubmit:', context.state.searchActive);
      console.log('query changed to:', context.state.query);
     });
  }

  // ends the submit action
  endNavSubmit() {
    if (this.state.searchActive === true) {
      this.setState({
        searchActive: false
      });
    }
  }

  render() {

    // triggers a redirection to Search page if 'searchActive' state is triggered from submission action
    if (this.state.searchActive) {
      TargetRoute = () => ( <Redirect to='/search' /> )
    }

    return (
      <div>
        <Router>
          <div>
            <Nav handleNavSubmit={this.handleNavSubmit} userId={this.state.userId}/>
            <TargetRoute />
            <Route exact path='/' component={() => <Landing />} />
            <Route path='/display/:id' component={Display} />
            <Route path='/landing' component={() => <Landing />} />
            <Route path='/edit/:user_id/:bento_id' component={Edit} />
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