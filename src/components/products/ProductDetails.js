import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

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

  render() {
    return (
      <div>
      <img src={this.state.image}/>
        <h1>{this.state.name}</h1>
        <p>{this.state.price}</p>
        <p>{this.state.description}</p>
        <Link to={"/products"}>Back to products</Link>
      </div>
    );
  }
}

export default ProductDetails;
