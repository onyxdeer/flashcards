import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (

    <nav className="navbar navbar-fixed-top navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Obento</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="User"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</Link></li>
            <li><Link to="Display"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Display</Link></li>
            <li><Link to="Edit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create</Link></li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Find A Bento Here" />
            </div>
            <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Profile<span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="User"><span className="glyphicon glyphicon-th" aria-hidden="true"></span> Personal</Link></li>
                <li><Link to="Settings"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to="Logout"><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Log Out</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );    
};

export default Nav;

