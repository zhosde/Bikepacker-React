import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./components/HomePage";
import Main from "./components/Main";
import ProfileNav from "./components/auth/ProfileNav";
import OrderList from "./components/auth/OrderList";
import OrderDetails from "./components/auth/OrderDetails";
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
    return axios.get(`${process.env.REACT_APP_API_URL}/products`, {
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
    // copy the object
    const productQtyCopy = Object.assign({}, this.state.productsInCart);
    productQtyCopy[productId] = parseInt(event.target.value);
    this.setState({
      productsInCart: productQtyCopy,
    });
  };

  // @todo --> clear cart state after logging out
  // clearCartState = () => {
  //   if(!this.state.loggedIn){
  //     this.setState({
  //       productsInCart: {}
  //     });
  //   }
  // }

  deleteProductInCart = (id) => {
    // copy the obj
    const productIdCopy = Object.assign({}, this.state.productsInCart)
    // convert obj into id arr, delete filtered id, get it back to obj
    const IdObj = Object.keys(productIdCopy).filter(key=>key!==id).reduce((obj,key)=>{
      obj[key] = productIdCopy[key]
      return obj
    },{})
    this.setState(() => {
      return {
        productsInCart: IdObj,
      };
    });
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  updateState = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
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
    }

    this.getAllProducts()
      .then((responseFromApi) => {
        this.setState({
          listOfProducts: responseFromApi.data,
        });
      })
      .catch((err) => {
        console.log("error getting products: ", err);
      });
  };

  componentDidMount() {
    this.updateState();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/about" component={About} />;
          <div>
            <Nav
              numOfProductsInCart={
                Object.keys(this.state.productsInCart).length
              }
            />
            <Route
              exact
              path="/profile"
              render={(props) => {
                return (
                  <ProfileNav
                    {...props}
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                    getUser={this.getTheUser}
                  />
                );
              }}
            ></Route>
            <Route
              path="/profile/orders/:id"
              render={(props) => {
                return (
                  <>
                    <ProfileNav
                      {...props}
                      userData={this.state.user}
                      userIsLoggedIn={this.state.isLoggedIn}
                      getUser={this.getTheUser}
                    />
                    <OrderDetails
                      {...props}
                      userData={this.state.user}
                      userIsLoggedIn={this.state.isLoggedIn}
                      getUser={this.getTheUser}
                      products={this.state.listOfProducts}
                    />
                  </>
                );
              }}
            ></Route>
            <Route
              exact
              path="/profile/orders"
              render={(props) => {
                return (
                  <>
                    <ProfileNav
                      {...props}
                      userData={this.state.user}
                      userIsLoggedIn={this.state.isLoggedIn}
                      getUser={this.getTheUser}
                    />
                    <OrderList
                      {...props}
                      userData={this.state.user}
                      userIsLoggedIn={this.state.isLoggedIn}
                      getUser={this.getTheUser}
                      products={this.state.listOfProducts}
                    />
                  </>
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
                    clickToDelete={this.deleteProductInCart}
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
                    updateTheState={() => this.updateState()}
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
                    updateTheState={() => this.updateState()}
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
