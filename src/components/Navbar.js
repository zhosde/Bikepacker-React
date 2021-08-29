import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/main-logo.png";
import heart from '../assets/heart.png'
import profile from "../assets/profile.png";
import cart from "../assets/cart.png";

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
      color: "black",
    };

    return (
      <div className="navbar">
        <Link to="/">
          <div>
            <img id="logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="searchbar">
          <input
            type="search"
            name="search"
            placeholder="Search..."
            value={this.state.searchWord}
            onChange={this.handleSearch}
          ></input>
        </div>
        <div className="navbar-icon">
          <Link to="/profile" style={linkStyle}>
            <img src={profile} alt="profile icon" />
          </Link>
        </div>
        <div className="navbar-icon">
          <Link to="/cart" style={linkStyle}>
            <img src={cart} alt="cart icon" />
          </Link>
        </div>
        <div className="navbar-icon">
          <Link to="/profile" style={linkStyle}>
            <img src={heart} alt="heart icon" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
