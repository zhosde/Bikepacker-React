import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct"
import Navbar from "../Navbar";
import Cart from "../Cart"

class ProductDetails extends Component {
  state = {
    numOfProduct: 0,
    numOfProductInCart: 0,
    productInCart: [],
  };

  getSingleProduct = () => {
    const { id } = this.props._id;
    axios
      .get(`http://localhost:5000/api/products/${id}`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        const theProduct = responseFromApi.data;
        // this.setState(theProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (this.props.name) {
      return (
        <EditProduct
          theProduct={this.props}
          getTheProduct={this.getSingleProduct}
          {...this.props}
        />
      );
    }
  };

  deleteProduct = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/products/${params.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.history.push("/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToCartBtn = (event) => {
    event.preventDefault();
    const cartItem = [{ productID: this.props._id, qty: this.props.qty }];
    this.setState((prevState) => {
      return {
        numOfProductInCart: prevState.numOfProductInCart + 1,
        productInCart: prevState.productInCart.push(cartItem),
      };
    });
    return (
      <Cart
        productInCart={this.state.productInCart}
        numOfProduct={this.state.numOfProduct}
        user = {this.props.user}
      />
    );
  };

  handleChangeQty = (event) => {
    this.setState({
      numOfProduct: event.target.value,
    });
  };

  ownershipCheck = () => {
    const currentUserIsAdmin = this.props.user && this.props.user.isAdmin;
    if (currentUserIsAdmin) {
      return (
        <>
          <div>{this.renderEditForm()}</div>
          <div>
            <button
              className="delete-btn"
              onClick={() => this.deleteProduct(this.props._id)}
            >
              Delete product
            </button>
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <hr className="hr-line" />
        <div className="product-detail">
          <div>
            <img src={this.props.image} />
          </div>
          <div className="product-info">
            <h1>{this.props.name}</h1>
            <p>{this.props.price} €</p>
            <label>
              Qty:
              <input
                type="number"
                name="qty"
                value={this.state.numOfProduct}
                onChange={(e) => this.handleChangeQty(e)}
              />
            </label>
            <br />
            <button onClick={this.addToCartBtn}>Add In Cart</button>
            <br />
            <Link to={"/shop"}>Back to products</Link>
            <hr />
            <p>{this.props.description}</p>
          </div>
        </div>
        <div> {this.ownershipCheck()} </div>
      </>
    );
  }
}

export default ProductDetails;
