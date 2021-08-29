import React, { Component } from "react";
import ProductList from "./products/ProductList";
import Navbar from "./Navbar";

class Main extends Component {
  state = {
    filterStr: "",
  };

  SearchTheProduct = (input) => {
    this.setState({
      filterStr: input,
    });
  };

  // get all the products from App.js and filter them with search word
  getFilteredProducts() {
    const productsCopy = [...this.props.products];
    let filteredProducts = productsCopy.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(this.state.filterStr.toLowerCase());
    });
    return filteredProducts;
  }

  render() {
    // let updating be in render phase
    const filteredProducts = this.getFilteredProducts();

    return (
      <div>
        <Navbar SearchTheProduct={this.SearchTheProduct} />
        <ProductList products={filteredProducts} />
      </div>
    );
  }
}

export default Main;
