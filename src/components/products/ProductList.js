import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProductList extends Component {
  render() {
    return (
      <div className='product-list'>
        <ul>
          {this.props.products.map((product) => {
            return (
              <li key={product._id}>
                <Link to={`/products/${product._id}`}>
                <img src={product.image} />
                  <h3>{product.name}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ProductList;
