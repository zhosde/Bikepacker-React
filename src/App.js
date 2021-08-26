import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import ProductList from "./components/products/ProductList";
import Navbar from './components/Navbar'
import ProductDetails from "./components/products/ProductDetails";
import Signup from "./components/auth/Signup";
import authService from "./components/auth/auth-service";
import Login from "./components/auth/Login";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          this.setState({
            user: data,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          this.setState({
            user: null,
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar
          userData={this.state.user}
          userIsLoggedIn={this.state.isLoggedIn}
          getUser={this.getTheUser}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Login {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/products"
            user={this.state.user}
            component={ProductList}
          />
          <Route
            exact
            path="/products/:id"
            render={(props) => (
              <ProductDetails {...props} user={this.state.user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
