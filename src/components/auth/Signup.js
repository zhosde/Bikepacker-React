import React, { Component } from 'react';
import authService from "./auth-service";

class Signup extends Component {

  state = { username: '', password: '', errorMessage:'' }

  handleFormSubmit = (event) => {
  event.preventDefault();
  const {username, password} = this.state;
 
  authService.signup(username, password)
  .then(createdUser => {
      this.setState({
          username: "",
          password: "",
      });
    this.props.getUser(createdUser, true);
  })
  .catch(error => {
    this.setState({
      errorMessage:
        `Username needs to be unique. \n Password needs to have at least 6 chars \n and must contain at least one number, one lowercase and one uppercase letter`,
    });
  })
}
 
handleChange = (event) => {
  const {name, value} = event.target;
  this.setState({[name]: value});
}

  render(){
    return (
      <div className="signup">
        <p>Don't have an account?</p>
        <form onSubmit={this.handleFormSubmit} className="box">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                required
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            {" "}
            Signup{" "}
          </button>
        </form>
        {this.state.errorMessage && (
          <p className="err-info">{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Signup;
