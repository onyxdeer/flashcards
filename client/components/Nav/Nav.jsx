import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-default">
      <div>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/">Main</Link>
          </div>
          <Link to="/display">Display</Link><br></br>
          <Link to="/edit">Edit</Link><br></br>
          <Link to="/user">User</Link><br></br>
          <Link to="/landing">Landing</Link>
      </div>
    </nav>
  );    
};

export default Nav;