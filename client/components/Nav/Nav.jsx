import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }

    this.handleNavSearch = this.handleNavSearch.bind(this);
    this.bringUpInput = this.bringUpInput.bind(this);
  }

  // detects changes to input in navbar searchbar
  handleNavSearch(event) {
    var context = this;
    this.setState({
      input: event.target.value,
    }, () => console.log('input:',context.state.input));
  }

  // brings up the 'input' to App and will assign to 'query'
  bringUpInput(input) {
    var context = this;
    return function(event) {
      console.log('input in bringUpInput', input);
      context.props.handleNavSubmit(event, input);
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
            <Link className="navbar-brand" to="/">Obento</Link>
          </div>

          {/* This container allows the navbar contents to be collapsed thus responsive */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav">
              <li><Link to="User"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</Link></li>
              <li><Link to="Display"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Display</Link></li>
              <li><Link to="Edit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create</Link></li>
              <li><Link to="Voice"><span className="glyphicon glyphicon-record" aria-hidden="true"></span> Voice</Link></li>
            </ul>

            {/* Search bar */}
            <form className="navbar-form navbar-left" onSubmit={this.bringUpInput(this.state.input)}>
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.input} placeholder="Find A Bento Here" onChange={this.handleNavSearch} />
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

export default Nav;

