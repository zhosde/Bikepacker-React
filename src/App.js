import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./components/HomePage";
import Main from "./components/Main";
import UserProfile from "./components/UserProfile";
import ProductDetails from "./components/products/ProductDetails";
import Signup from "./components/auth/Signup";
import authService from "./components/auth/auth-service";
import Login from "./components/auth/Login";
import AddProduct from "./components/products/AddProduct";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    listOfProducts: [],
  };

  getAllProducts = () => {
    return axios.get(`http://localhost:5000/api/products`, {
      withCredentials: true,
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      return authService.loggedin();
    }
  };

  componentDidMount() {
    this.fetchUser()
      .then((response) => {
        this.setState({
          user: response,
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        this.setState({
          user: null,
          isLoggedIn: false,
        });
      });

    this.getAllProducts()
      .then((responseFromApi) => {
        this.setState({
          listOfProducts: responseFromApi.data,
        });
      })
      .catch((err) => {
        console.log("error getting products: ", err);
      });
  }

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route
            exact
            path="/profile"
            userData={this.state.user}
            userIsLoggedIn={this.state.isLoggedIn}
            getUser={this.getTheUser}
            products={this.state.listOfProducts}
            component={UserProfile}
          ></Route>
          <Route
            exact
            path="/shop"
            render={(props) => {
              return <Main {...props} products={this.state.listOfProducts} />;
            }}
          ></Route>
          <Route
            exact
            path="/login"
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
            products={this.state.listOfProducts}
            component={AddProduct}
          />
          <Route
            exact
            path="/products/:id"
            render={(routeProps) => {
              const requestedProduct = this.state.listOfProducts.find(
                (product) => {
                  return product._id === routeProps.match.params.id;
                }
              );
              return (
                <ProductDetails {...requestedProduct} user={this.state.user} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
