import React, { Component } from 'react';
import authService from "./auth-service";

class Signup extends Component {

  state = { username: '', password: '' }

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
  .catch(error => console.log(error))
}
 
handleChange = (event) => {
  const {name, value} = event.target;
  this.setState({[name]: value});
}

  render(){
    return (
      <div className="signup">
        <p>Don't have an account?</p>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit"> Signup </button>
        </form>
      </div>
    );
  }
}

export default Signup;
