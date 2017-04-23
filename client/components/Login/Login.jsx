import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkLogin, handleEmailInput, handlePasswordInput, clearAuthInputs } from '../../actions/authActions.js';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.checkLogin(this.props.emailAddress, this.props.password);
  }

  componentWillUnmount() {
    this.props.clearAuthInputs();
  }

  render() {
    return (
      <div className="container">
        <h1>Log In</h1>
        <form onSubmit={this.handleLogin}>
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={this.props.emailAddress} onChange={(event) => this.props.handleEmailInput(event)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.props.password} onChange={(event) => this.props.handlePasswordInput(event)} />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-success">Sign in</button>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <label>Don't have an account?</label>
              <span>  </span>
              <Link to="register" className="btn btn-success">Register</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailAddress: state.authReducer.emailAddress,
    password: state.authReducer.password,
  };
}

export default connect(mapStateToProps, { checkLogin, handleEmailInput, handlePasswordInput, clearAuthInputs })(Login);
