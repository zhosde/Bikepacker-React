import React, { Component } from "react";
import ProductList from "./products/ProductList";
import SearchBar from "./SearchBar";

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
      <main>
        <div>
          <SearchBar SearchTheProduct={this.SearchTheProduct} />
          <hr className="hr-line" />
        </div>
        <div>
          <ProductList products={filteredProducts} />
        </div>
      </main>
    );
  }
}

export default Main;
