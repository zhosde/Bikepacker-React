import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./components/HomePage";
import Main from "./components/Main";
import UserProfile from "./components/auth/UserProfile";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/Cart";
import authService from "./components/auth/auth-service";
import AddProduct from "./components/products/AddProduct";
import About from "./components/About";
import Nav from "./components/Nav";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    listOfProducts: [],
    productsInCart: {},
  };

  getAllProducts = () => {
    return axios.get(`http://localhost:5000/api/products`, {
      withCredentials: true,
    });
  };

  handleAddToCart = (selectedProduct) => {
    this.setState((prevState) => {
      // count and record the qty of product in cart dynamically
      // if the id exists => 0+1, if id exists => +1
      prevState.productsInCart[selectedProduct._id] =
        (prevState.productsInCart[selectedProduct._id] || 0) + 1;      

      return {
        productsInCart: prevState.productsInCart,
      };
    });
  };

  handleQtyChange = (event, productId) => {
    // turn obj into str
    const productQtyCopy = JSON.parse(
      JSON.stringify(this.state.productsInCart)
    );
    productQtyCopy[productId] = event.targt.value
    this.setState({
      productsInCart: productQtyCopy
    })
  }

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
          <Route exact path="/about" component={About} />;
          <div>
            <Nav numOfProductsInCart={Object.keys(this.state.productsInCart).length} />
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
              path="/cart"
              render={(props) => {
                return (
                  <Cart
                    {...props}
                    handleQtyChange={this.handleQtyChange}
                    productsInCart={this.state.productsInCart}
                    listOfProducts={this.state.listOfProducts}
                    user={this.state.user}
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
              path="/addproduct"
              render={(props) => {
                return (
                  <AddProduct
                    {...props}
                    user={this.state.user}
                    products={this.state.listOfProducts}
                  />
                );
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
                  <ProductDetails
                    addToCart={this.handleAddToCart}
                    requestedProduct={requestedProduct}
                    {...routeProps}
                    user={this.state.user}
                  />
                );
              }}
            />
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
