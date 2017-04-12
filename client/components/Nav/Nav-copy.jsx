import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, FormGroup, FormControl, MenuItem, Button, Dropdown, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/navActions.jsx';
import { handleNavSubmit } from '../../actions/appActions.jsx'

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
              <li><Link to="/User" onSelect={this.closeNav}><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</Link></li>
              <li><Link to="/Edit/new" onSelect={this.closeNav}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create</Link></li>
              {/*<li><Link to="/Voice" onSelect={this.closeNav}><span className="glyphicon glyphicon-record" aria-hidden="true"></span> Voice</Link></li>*/}
            </ul>            

            {/* Search bar */}
            <form className="navbar-form navbar-left" onSubmit={this.handleBringUpInput(this.props.input)}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.props.input} placeholder="Find A Bento Here" onChange={this.props.handleNavSearch} onClick={this.props.clearText} />
              </div>
              <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search</button>
            </form>

            {/* Profile Dropdown Menu */}
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span> Profile<span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="User"><span className="glyphicon glyphicon-th" aria-hidden="true"></span> Personal</Link></li>
                  <li><Link to="Settings"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="Logout"><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Log Out</Link></li>
                </ul>
              </li>
            </ul>

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
    input: state.navReducer.input
  }
}

export default connect(mapStateToProps, actions)(Navigation);

        /*<Navbar collapseOnSelect fixedTop active activeKey activeHref>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Obento</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to="/User"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>User</Link></NavItem>
            <NavItem eventKey={2}><Link to="/Edit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>Create/Edit</Link></NavItem>
            <form className="navbar-form navbar-left" onSubmit={this.bringUpInput(this.state.input)}>
              <FormGroup>
                <FormControl type="text" value={this.state.input} placeholder="Find A Bento Here" onChange={this.handleNavSearch} />
              </FormGroup>
              {' '}
              <Button type="submit"><span className="glyphicon glyphicon-search" aria-hidden="true"></span>Search</Button>
            </form>
          </Nav>
          <Nav pullRight>
            <Glyphicon glyph="user" />
            <NavDropdown eventKey={1} title="Profile" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1}><span className="glyphicon glyphicon-th" aria-hidden="true"></span>Personal</MenuItem>
              <MenuItem eventKey={1.2}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span>Settings</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={1.3}><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>Log Out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>*/