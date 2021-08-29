import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct"
import Cart from "../Cart"

class ProductDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      productInCart: 0,
    };
  }

  renderEditForm = () => {
    if (this.props.name) {
      return (
        <EditProduct
          theProduct={this.props}
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
        this.props.history.push("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // addToCartBtn = (event) => {
  //   event.preventDefault();
  //   const items = [{ productID: this.state._id, qty: this.state.qty }];
  //   const user = this.props.user._id;
  //   axios
  //     .post(`http://localhost:5000/api/orders`, { items, user })
  //     .then((orderFromDB) => {
  //       return <Cart theOrder={orderFromDB} theProduct={this.state} />;
  //     });
  // };

  addToCartBtn = () => {
    this.setState((prevState) => {
      return {
        productInCart: prevState.productInCart + 1,
      };
    });
  };

  ownershipCheck = () => {
    const currentUserIsAdmin = this.props.user && this.props.user.isAdmin;
    if (currentUserIsAdmin) {
      return (
        <>
          <div>{this.renderEditForm()}</div>
          <div>
            <button onClick={() => this.deleteProduct(this.props._id)}>
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
        <div>
          <img src={this.props.image} />
          <h1>{this.props.name}</h1>
          <p>{this.props.price}</p>
          <p>{this.props.description}</p>
          <div>
            <button onClick={this.addToCartBtn}>
              Add In Cart
            </button>
          </div>
          <Link to={`/orders`}>To The Cart</Link>
          <Link to={"/products"}>Back to products</Link>
        </div>
        <div> {this.ownershipCheck()} </div>
      </>
    );
  }
}

export default ProductDetails;
