import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./components/HomePage";
import Main from "./components/Main";
import UserProfile from "./components/auth/UserProfile";
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

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route
            exact
            path="/profile"
            render={(props) => {
              return (
                <UserProfile
                  {...props}
                  userData={this.state.user}
                  userIsLoggedIn={this.state.isLoggedIn}
                  getUser={this.getTheUser}
                  products={this.state.listOfProducts}
                />
              );
            }}
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
            path="/profile"
            render={(props) => { return <Login {...props} getUser={this.getTheUser} />}}
          />
          <Route
            exact
            path="/profile"
            render={(props) => {return <Signup {...props} getUser={this.getTheUser} />}}
          />
          <Route
            exact
            path="/products"
            render={(props) => {return <AddProduct
                {...props}
                user={this.state.user}
                products={this.state.listOfProducts}
              />
            }}
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
