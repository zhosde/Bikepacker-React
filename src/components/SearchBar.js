import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";


class SearchBar extends Component {
  state = {
    searchWord: "",
    SearchTheProduct: this.props.SearchTheProduct,
  };

  handleSearch = async (event) => {
    await this.setState({ searchWord: event.target.value });
    this.state.SearchTheProduct(this.state.searchWord);
  };

  render() {
    return (
        <div className="searchbar">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            value={this.state.searchWord}
            onChange={this.handleSearch}
          ></input>
        </div>
    );
  }
}

export default SearchBar;
