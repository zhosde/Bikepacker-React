import React, { Component } from "react";
import authService from "./auth-service";

class Login extends Component {
  state = { username: "", password: "", errorMessage: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    authService
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response, true);
      })
      .catch((error) => {
        this.setState({
          errorMessage:
            "Either username or password is incorrect, please re-try",
        });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login">
        <p>Already have an account?</p>
        <form onSubmit={this.handleFormSubmit} className="box">
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
              <input
                className="input is-success"
                required
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className="input is-success"
                required
                type="password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Login
          </button>
        </form>
        {this.state.errorMessage && (
          <p className="err-info">{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default Login;
