import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, FormGroup, FormControl, MenuItem, Button, Dropdown, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/navActions.js';
import { handleNavSearch } from '../../actions/appActions.js';

class Navigation extends Component {
  constructor(props) {
    super(props);

  this.handleBringUpInput = this.handleBringUpInput.bind(this);   
  }
  
  // brings up the 'input' to App and will assign to 'query'
  handleBringUpInput(input) {
    var context = this;
    
    return function(event) {
      context.props.bringUpInput(event, input);
    }
  }

  componentDidMount() {
    $('.navbar-collapse .menu-item').click(function(){
      $(".navbar-collapse").collapse('hide');
    });
  }

  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container-fluid">

          {/* Logo Header */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand logo-nav" to="/">Obento</Link>
          </div>

          {/* This container allows the navbar contents to be collapsed thus responsive */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            
            <ul className="nav navbar-nav">
              <li><Link to="/Explore" className="menu-item" onSelect={this.closeNav}><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Explore</Link></li>
              <li><Link to="/Edit" className="menu-item" onClick = {()=> {this.props.handleRenderCreatePage()}} onSelect={this.closeNav}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create</Link></li>
              {/*<li><Link to="/Voice" onSelect={this.closeNav}><span className="glyphicon glyphicon-record" aria-hidden="true"></span> Voice</Link></li>*/}
            </ul>            

            {/* Search bar */}
            <form className="navbar-form navbar-right" onSubmit={this.handleBringUpInput(this.props.input)}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.props.input} placeholder="Find A Bento Here" onChange={this.props.handleNavSearch} onClick={this.props.clearText} />
              </div>
              <button type="submit" className="btn btn-default btn-sm menu-item"><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search</button>
            </form>

            {/* Profile Dropdown Menu */}
            {/*<ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span> Menu<span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="menu-item" to="Login"><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Log In</Link></li>
                </ul>
              </li>
            </ul>*/}

          {/* End of bar collapse container */}
          </div>

        {/* End of nav bar container */}
        </div>
      </nav>

    );
  }    
};

function mapStateToProps(state) {
  return { 
    input: state.navReducer.input,
    userId: state.appReducer.userId,
  };
}

export default connect(mapStateToProps, { ...actions, handleNavSearch })(Navigation);