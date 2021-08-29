import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/logo.png";

class Navbar extends Component {
  state = {
    searchWord: "",
    SearchTheProduct: this.props.SearchTheProduct,
  };

  handleSearch = async (event) => {
    await this.setState({ searchWord: event.target.value });
    this.state.SearchTheProduct(this.state.searchWord);
  };

  render() {
    const linkStyle = {
      color: "white",
    };

    return (
      <div>
        <ul>
          <li>
            <img src={logo} alt="logo" />
          </li>
          <li>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              value={this.state.searchWord}
              onChange={this.handleSearch}
            ></input>
          </li>
          <li>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/orders" style={linkStyle}>
              Cart
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
