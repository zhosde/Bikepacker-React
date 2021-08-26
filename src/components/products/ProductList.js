import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProduct from "./AddProduct";

class ProductList extends Component {
  state = { listOfProducts: [] };

  getAllProducts = () => {
    axios.get(`http://localhost:5000/api/products`).then((responseFromApi) => {
      this.setState({
        listOfProducts: responseFromApi.data,
      });
    });
  };

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    return (
      <div>
        <div>
          {this.state.listOfProducts.map((product) => {
            return (
              <div key={product._id}>
                <Link to={`/products/${product._id}`}>
                <img src={product.image} />
                  <h3>{product.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <AddProduct getData={() => this.getAllProducts()} /> 
        </div>
      </div>
    );
  }
}

export default ProductList;
