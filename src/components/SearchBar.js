import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchWord: "",
    searchTheProduct: this.props.searchTheProduct,
  };

  handleSearch = async (event) => {
    await this.setState({ searchWord: event.target.value });
    this.state.searchTheProduct(this.state.searchWord);
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

        <div className="searchbar field">
          <div className='control'>
            <input
            className='input'
              type="search"
              name="search"
              placeholder="Search..."
              value={this.state.searchWord}
              onChange={this.handleSearch}
            ></input>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchBar;