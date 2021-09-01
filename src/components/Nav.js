import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/logo-s.png";
import heart from "../assets/heart.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart.png";

class Nav extends Component {
  render() {
    const linkStyle = {
      color: "black",
    };

    return (
      <>
        <div className="navbar">
          <div>
            <Link to="/">
              <img id="logo" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="navbar-icon">
            <div>
              <Link to="/profile" style={linkStyle}>
                <img id="profile-icon" src={profile} alt="profile icon" />
              </Link>
            </div>

            <div>
              <Link to="/cart" style={linkStyle}>
                <img src={cart} alt="cart icon" /> (
                {this.props.numOfProductsInCart})
              </Link>
            </div>

            <div>
              <Link to="/profile" style={linkStyle}>
                <img src={heart} alt="heart icon" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
