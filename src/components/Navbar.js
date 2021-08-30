import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/main-logo.png";
import heart from '../assets/heart.png'
import profile from "../assets/profile.png";
import cart from "../assets/cart.png";

class NavBar extends Component {
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

        <div className="navbar-icon">
          <Link to="/profile" style={linkStyle}>
            <img src={profile} alt="profile icon" />
          </Link>
        </div>

        <div className="navbar-icon">
          <Link to="/cart" style={linkStyle}>
            <img src={cart} alt="cart icon" /> ({this.props.numOfProductsInCart})
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

export default NavBar;
