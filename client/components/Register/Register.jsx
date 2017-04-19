import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkSignup, handleEmailInput, handlePasswordInput, clearAuthInputs } from '../../actions/authActions.js';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.checkSignup(this.props.emailAddress, this.props.password);
  }

  componentWillUnmount() {
    this.props.clearAuthInputs();
  }

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSignup}>
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
    emailAddress: state.authReducer.emailAddress,
    password: state.authReducer.password,
  };
}

export default connect(mapStateToProps, { checkSignup, handleEmailInput, handlePasswordInput, clearAuthInputs })(Register);
