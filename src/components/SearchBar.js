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
      <section className="sec-nav">
        {/* <div className="category-links">
          <div>
            <Link to="/shop">Gear</Link>
          </div>
          <div>
            <Link to="/shop">Electronics</Link>
          </div>
          <div>
            <Link to="/shop">HOT</Link>
          </div>
          <div>
            <Link to="/shop">%</Link>
          </div>
        </div> */}

        <div className="searchbar">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            value={this.state.searchWord}
            onChange={this.handleSearch}
          ></input>
        </div>
      </section>
    );
  }
}

export default SearchBar;