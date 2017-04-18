import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form action="/signup" method="post">
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-2">
              <button type="submit" className="btn btn-success">Sign Up</button>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-2">
              <Link to="login" className="btn btn-success">Back</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Register);
