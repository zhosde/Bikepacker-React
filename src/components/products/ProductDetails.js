import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProductDetails extends Component {
  state = {};

  componentDidMount() {
    this.getSingleProduct();
  }

  getSingleProduct = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      .then((responseFromApi) => {
        const theProduct = responseFromApi.data;
        this.setState(theProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (this.state.name) {
      return (
        <EditProduct
          theProduct={this.state}
          getTheProduct={this.getSingleProduct}
          {...this.props}
        />
      );
    }
  };

  deleteProduct = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/products/${params.id}`)
      .then(() => {
        this.props.history.push("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToCartBtn = (event) => {
    event.preventDefault();
    const items = [{ productID: this.state._id, qty: this.state.qty }];
    const user = this.props.user._id;
    axios
      .post(`http://localhost:5000/api/orders`, { items, user })
      .then((orderFromDB) => {
        return <Cart theOrder={orderFromDB} theProduct={this.state} />;
      });
  };

  ownershipCheck = () => {
    const currentUserIsAdmin = this.props.user && user.isAdmin;
    if (currentUserIsAdmin) {
      return (
        <>
          <div>{this.renderEditForm()}</div>
          <div>
            <button onClick={() => this.deleteProduct(this.state._id)}>
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
          <img src={this.state.image} />
          <h1>{this.state.name}</h1>
          <p>{this.state.price}</p>
          <p>{this.state.description}</p>
          <div>
            <button type="submit" onClick={this.addToCartBtn}>
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
